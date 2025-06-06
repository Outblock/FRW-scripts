import EVM from 0xEVM

transaction(code: String) {
  let coa: auth(EVM.Deploy) &EVM.CadenceOwnedAccount

  prepare(signer: auth(Storage) &Account) {
    self.coa = signer.storage.borrow<auth(EVM.Deploy) &EVM.CadenceOwnedAccount>(
      from: /storage/evm) ?? panic("Could not borrow reference to the COA!")
  }

  execute {
    self.coa.deploy(code: code.decodeHex(), gasLimit: 15000000, value: EVM.Balance(attoflow: 0))
  }
}
