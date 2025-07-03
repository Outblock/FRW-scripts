import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_contract_names script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Contract names should return when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('basic/getContractNames', [fcl.arg(address, t.Address)])

    expect(Array.isArray(res)).toBe(true)

    console.log(res)
  })

})