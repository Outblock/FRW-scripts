import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_associated_evm_address script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Associated EVM address should return when query by script', async () => {

    const identifier = 'A.2d4c3caffbeab845.FLOAT.NFT'
    const res = await executeQuery('bridges/getAssociatedEvmAddress', [fcl.arg(identifier, t.String)])

    expect(typeof res).toBe('string')

    console.log(res)
  })

})