import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test calculate_bridge_fee script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Bridge fee should return when query by script', async () => {

    const bytes = '100'
    const res = await executeQuery('bridges/calculateBridgeFee', [fcl.arg(bytes, t.UInt64)])

    expect(typeof res).toBe('string')
    

    console.log(res)
  })

})