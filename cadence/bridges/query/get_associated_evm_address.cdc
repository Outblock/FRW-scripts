import EVM from 0xEVM
import FlowEVMBridgeConfig from 0xFlowEVMBridge

access(all)
fun main(identifier: String): String? {
  if let type = CompositeType(identifier) {
    if let address = FlowEVMBridgeConfig.getEVMAddressAssociated(with: type) {
      return address.toString()
    }
  }
  return nil
}