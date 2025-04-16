import FlowStakingCollection from 0xFlowStakingCollection

access(all) fun main(address: Address): Bool {
  return FlowStakingCollection.doesAccountHaveStakingCollection(address: address)
}