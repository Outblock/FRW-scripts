import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test query_flow_balance script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Flow balance should return when query by script', async () => {

    const addresses = ['0xf380b22ef386ac7e']
    const res = await executeQuery('basic/queryFlowBalance', [fcl.arg(addresses, t.Array(t.Address))])

    expect(Array.isArray(res)).toBe(true)

    console.log(res)
  })

})