import FlowEVMBridge from 0xFlowEVMBridge

access(all) fun main(type: Type): Bool? {
  return FlowEVMBridge.typeRequiresOnboarding(type)
}
