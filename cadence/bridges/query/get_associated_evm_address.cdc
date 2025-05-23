import EVM from 0xEVM

import EVMUtils from 0xFlowEVMBridge
import FlowEVMBridgeConfig from 0xFlowEVMBridge

access(all)
fun main(identifier: String): String? {
  if let type = CompositeType(identifier) {
    if let address = FlowEVMBridgeConfig.getEVMAddressAssociated(with: type) {
      return EVMUtils.getEVMAddressAsHexString(address: address)
    }
  }
  return nil
}