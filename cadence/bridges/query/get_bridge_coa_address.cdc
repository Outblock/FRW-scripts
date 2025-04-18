import EVM from 0xEVM

import EVMUtils from 0xFlowEVMBridge
import FlowEVMBridgeConfig from 0xFlowEVMBridge

access(all) fun main(): String {
  let address: EVM.EVMAddress = FlowEVMBridge.getBridgeCOAEVMAddress()
  return EVMUtils.getEVMAddressAsHexString(address: address)
}