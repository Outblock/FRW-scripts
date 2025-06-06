import FlowIDTableStaking from 0xFlowIDTableStaking

access(all) fun main(): UFix64 {
  let apr = FlowIDTableStaking.getEpochTokenPayout() / FlowIDTableStaking.getTotalStaked() * 54.0 * (1.0 - FlowIDTableStaking.getRewardCutPercentage())
  return apr
}