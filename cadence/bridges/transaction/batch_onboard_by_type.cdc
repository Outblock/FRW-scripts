import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken

import ScopedFTProviders from 0xFlowEVMBridge

import EVM from 0xEVM

import FlowEVMBridge from 0xFlowEVMBridge
import FlowEVMBridgeConfig from 0xFlowEVMBridge

transaction(types: [Type]) {

  let scopedProvider: @ScopedFTProviders.ScopedFTProvider
  
  prepare(signer: auth(CopyValue, BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {

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
    // Set a withdrawal limit for the provider
    let providerLimit = FlowEVMBridgeConfig.onboardFee * UFix64(types.length)
    let providerFilter = ScopedFTProviders.AllowanceFilter(providerLimit)
    // Create ScopedFTProvider to expire just after this transaction
    self.scopedProvider <- ScopedFTProviders.createScopedFTProvider(
      provider: providerCapCopy,
      filters: [ providerFilter ],
      expiration: getCurrentBlock().timestamp + 1.0
    )
  }

  execute {
    for type in types { 
      // Continue on if the type does not require onboarding
      if FlowEVMBridge.typeRequiresOnboarding(type) != true {
        continue
      }
      // Onboard the asset Type
      FlowEVMBridge.onboardByType(
        type,
        feeProvider: &self.scopedProvider as auth(FungibleToken.Withdraw) &{FungibleToken.Provider}
      )
    }
    destroy self.scopedProvider
  }
}
