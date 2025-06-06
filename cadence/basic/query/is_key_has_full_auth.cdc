
access(all) fun main(address: Address, publicKey: String): Bool {
  let account = getAccount(address)
  var flag = false
  fun accountFn(accountKey: AccountKey): Bool {
    let key = String.encodeHex(accountKey.publicKey.publicKey)
    if publicKey == key {
      flag = accountKey.weight >= UFix64(1000) && !accountKey.isRevoked
    }
    return false
  }
  account.keys.forEach(accountFn)

  return flag
}
