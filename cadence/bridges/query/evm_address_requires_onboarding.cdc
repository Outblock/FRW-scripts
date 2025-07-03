import EVM from 0xEVM
import FlowEVMBridge from 0xFlowEVMBridge

access(all) fun main(evmAddressHex: String): Bool? {
  if let address = EVM.getTypeAssociated(evmAddressHex) {
    return FlowEVMBridge.evmAddressRequiresOnboarding(address)
  }
  return nil
}
