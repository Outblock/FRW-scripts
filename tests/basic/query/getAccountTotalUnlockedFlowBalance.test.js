import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_account_total_unlocked_flow_balance script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Account total unlocked flow balance should return when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('basic/getAccountTotalUnlockedFlowBalance', [fcl.arg(address, t.Address)])

    expect(typeof res).toBe('string')
    

    console.log(res)
  })

})