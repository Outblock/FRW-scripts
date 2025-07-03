import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_storage_info script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Storage info should return when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const res = await executeQuery('basic/getStorageInfo', [fcl.arg(address, t.Address)])

    expect(res).toHaveProperty('capacity')
    expect(res).toHaveProperty('used')
    expect(res).toHaveProperty('available')
    

    console.log(res)
  })

})