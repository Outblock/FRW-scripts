import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
  // exportScripts
} from '@/index'
import { setUpFcl } from '../../utils'


describe('Test get account info script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Account info should return when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('basic/getAccountInfo', [fcl.arg(address, t.Address)])

    expect(res).toHaveProperty('address')
    expect(res.address).toBe(address)
    expect(res).toHaveProperty('balance')
    expect(res).toHaveProperty('availableBalance')
    expect(res).toHaveProperty('storageUsed')
    expect(res).toHaveProperty('storageCapacity')
    expect(res).toHaveProperty('storageFlow')

    console.log(res)
  })

})