import FlowEVMBridge from 0xFlowEVMBridge

access(all) fun main(types: [Type]): {Type: Bool?} {
  let results: {Type: Bool?} = {}
  for type in types {
    if results[type] != nil {
      continue
    }
    results.insert(key: type, FlowEVMBridge.typeRequiresOnboarding(type))
  }
  return results
}
