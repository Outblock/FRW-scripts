import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_find_domain_by_address script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Find domain should return when query by script', async () => {

    const address = '0x3d642bdf22ef8719'
    const res = await executeQuery('basic/getFindDomainByAddress', [fcl.arg(address, t.Address)])
    console.log(res)

    expect(res).not.toBe(null)

  })

})