import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_coa_addr script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return coa address when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('evm/getCoaAddr', [fcl.arg(address, t.Address)])

    expect(typeof res).toBe('string')

    console.log(res)
  })

})