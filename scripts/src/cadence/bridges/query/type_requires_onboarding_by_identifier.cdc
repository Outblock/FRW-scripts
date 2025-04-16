import FlowEVMBridge from 0xFlowEVMBridge

access(all) fun main(identifier: String): Bool? {
  if let type = CompositeType(identifier) {
    return FlowEVMBridge.typeRequiresOnboarding(type)
  }
  return nil
}
