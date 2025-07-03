import EVM from 0xEVM

access(all) fun main(hexEncodedAddress: String): UFix64 {
  return EVM.addressFromString(hexEncodedAddress).balance().inFLOW()
}
