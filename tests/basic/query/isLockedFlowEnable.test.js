import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test is_locked_flow_enable script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('basic/isLockedFlowEnable', [fcl.arg(address, t.Address)])

    expect(typeof res).toBe('boolean')

    console.log(res)
  })

})