import EVMUtils from 0xFlowEVMBridge
import FlowEVMBridge from 0xFlowEVMBridge

access(all) fun main(evmAddresses: [String]): {String: Bool?} {
  let results: {String: Bool?} = {}
  for addressHex in evmAddresses {
    if results[addressHex] != nil {
      continue
    }
    if let address = EVMUtils.getEVMAddressFromHexString(address: addressHex) {
      let requiresOnboarding = FlowEVMBridge.evmAddressRequiresOnboarding(address)
      results.insert(key: addressHex, requiresOnboarding)
    }
  }
  return results
}
