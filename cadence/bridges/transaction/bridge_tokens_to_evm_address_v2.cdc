import MetadataViews from 0xMetadataViews
import ViewResolver from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import FungibleTokenMetadataViews from 0xFungibleToken

import ScopedFTProviders from 0xFlowEVMBridge

import EVM from 0xEVM

import FlowEVMBridgeUtils from 0xFlowEVMBridge
import FlowEVMBridge from 0xFlowEVMBridge
import FlowEVMBridgeConfig from 0xFlowEVMBridge


transaction(vaultIdentifier: String, amount: UFix64, recipient: String) {
  let sentVault: @{FungibleToken.Vault}
  let requiresOnboarding: Bool
  let scopedProvider: @ScopedFTProviders.ScopedFTProvider

  prepare(signer: auth(CopyValue, BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
    /* --- Construct the Vault type --- */
    //
    // Construct the Vault type from the provided identifier
    let vaultType = CompositeType(vaultIdentifier)
      ?? panic("Could not construct Vault type from identifier: ".concat(vaultIdentifier))
    // Parse the Vault identifier into its components
    let tokenContractAddress = FlowEVMBridgeUtils.getContractAddress(fromType: vaultType)
      ?? panic("Could not get contract address from identifier: ".concat(vaultIdentifier))
    let tokenContractName = FlowEVMBridgeUtils.getContractName(fromType: vaultType)
      ?? panic("Could not get contract name from identifier: ".concat(vaultIdentifier))
    
    /* --- Retrieve the funds --- */
    //
    // Borrow a reference to the FungibleToken Vault
    let viewResolver = getAccount(tokenContractAddress).contracts.borrow<&{ViewResolver}>(name: tokenContractName)
      ?? panic("Could not borrow ViewResolver from FungibleToken contract")
    let vaultData = viewResolver.resolveContractView(
        resourceType: nil,
        viewType: Type<FungibleTokenMetadataViews.FTVaultData>()
      ) as! FungibleTokenMetadataViews.FTVaultData? ?? panic("Could not resolve FTVaultData view")
    let vault = signer.storage.borrow<auth(FungibleToken.Withdraw) &{FungibleToken.Vault}>(
        from: vaultData.storagePath
      ) ?? panic("Could not access signer's FungibleToken Vault")

    // Withdraw the requested balance & calculate the approximate bridge fee based on storage usage
    let currentStorageUsage = signer.storage.used
    self.sentVault <- vault.withdraw(amount: amount)
    let withdrawnStorageUsage = signer.storage.used
    // Approximate the bridge fee based on the difference in storage usage with some buffer
    var approxFee = FlowEVMBridgeUtils.calculateBridgeFee(
        bytes: currentStorageUsage - withdrawnStorageUsage
      ) * 1.10
    // Determine if the Vault requires onboarding - this impacts the fee required
    self.requiresOnboarding = FlowEVMBridge.typeRequiresOnboarding(self.sentVault.getType())
      ?? panic("Bridge does not support this asset type")
    if self.requiresOnboarding {
      approxFee = approxFee + FlowEVMBridgeConfig.onboardFee
    }

    /* --- Configure a ScopedFTProvider --- */
    //
    // Issue and store bridge-dedicated Provider Capability in storage if necessary
    if signer.storage.type(at: FlowEVMBridgeConfig.providerCapabilityStoragePath) == nil {
      let providerCap = signer.capabilities.storage.issue<auth(FungibleToken.Withdraw) &{FungibleToken.Provider}>(
        /storage/flowTokenVault
      )
      signer.storage.save(providerCap, to: FlowEVMBridgeConfig.providerCapabilityStoragePath)
    }
    // Copy the stored Provider capability and create a ScopedFTProvider
    let providerCapCopy = signer.storage.copy<Capability<auth(FungibleToken.Withdraw) &{FungibleToken.Provider}>>(
        from: FlowEVMBridgeConfig.providerCapabilityStoragePath
      ) ?? panic("Invalid Provider Capability found in storage.")
    let providerFilter = ScopedFTProviders.AllowanceFilter(approxFee)
    self.scopedProvider <- ScopedFTProviders.createScopedFTProvider(
        provider: providerCapCopy,
        filters: [ providerFilter ],
        expiration: getCurrentBlock().timestamp + 1.0
      )
  }

  pre {
    self.sentVault.getType().identifier == vaultIdentifier:
      "Attempting to send invalid vault type - requested: ".concat(vaultIdentifier)
      .concat(", sending: ").concat(self.sentVault.getType().identifier)
    self.sentVault.balance == amount: "Amount to be transferred does not match the requested amount"
  }

  execute {
    if self.requiresOnboarding {
      // Onboard the Vault to the bridge
      FlowEVMBridge.onboardByType(
        self.sentVault.getType(),
        feeProvider: &self.scopedProvider as auth(FungibleToken.Withdraw) &{FungibleToken.Provider}
      )
    }
    // Execute the bridge transaction
    let recipientEVMAddress = EVM.addressFromString(recipient)
    FlowEVMBridge.bridgeTokensToEVM(
      vault: <-self.sentVault,
      to: recipientEVMAddress,
      feeProvider: &self.scopedProvider as auth(FungibleToken.Withdraw) &{FungibleToken.Provider}
    )
    // Destroy the ScopedFTProvider
    destroy self.scopedProvider
  }
}