import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test check_coa_link script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean value when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('evm/checkCoaLink', [fcl.arg(address, t.Address)])

    expect(typeof res).toBe('boolean')

    console.log(res)
  })

})