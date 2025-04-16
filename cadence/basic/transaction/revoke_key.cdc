transaction(index: Int) {
  prepare(signer: auth(Keys) &Account) {
    let keyA = signer.keys.revoke(keyIndex: index)
  }
}