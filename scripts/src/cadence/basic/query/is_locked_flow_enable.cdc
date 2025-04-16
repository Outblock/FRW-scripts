import LockedTokens from 0xLockedTokens

access(all) fun main(address: Address): Bool {
  let account = getAccount(address)
  return account.capabilities.exists(LockedTokens.LockedAccountInfoPublicPath)
}