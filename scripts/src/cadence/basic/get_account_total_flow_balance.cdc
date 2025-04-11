import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import LockedTokens from 0xLockedTokens
// import FungibleToken from 0xee82856bf20e2aa6
// import FlowToken from 0x0ae53cb6e3f42a79
// import LockedTokens from 0xf8d6e0586b0a20c7

access(all) fun main(address: Address): UFix64 {
    let account = getAccount(address)
    let unlockedVault = account
      .capabilities.get<&{FungibleToken.Balance}>(/public/flowTokenBalance)!
      .borrow()
        ?? panic("Could not borrow Balance reference to the Vault")
    let unlockedBalance = unlockedVault.balance
        
    let lockedAccountInfoCap = account
      .capabilities.get
      <&LockedTokens.TokenHolder>
      (LockedTokens.LockedAccountInfoPublicPath)
    if lockedAccountInfoCap == nil || !(lockedAccountInfoCap!.check()) {
        return unlockedBalance
    }
    
    let lockedAccountInfoRef = lockedAccountInfoCap!.borrow()!
    let lockedBalance = lockedAccountInfoRef.getLockedAccountBalance()
    
    return lockedBalance + unlockedBalance
}