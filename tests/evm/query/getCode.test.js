import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_code script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return code when query by script', async () => {

    const hexEncodedAddress = '2aaBea2058b5aC2D339b163C6Ab6f2b6d53aabED'
    const res = await executeQuery('evm/getCode', [fcl.arg(hexEncodedAddress, t.String)])

    expect(typeof res).toBe('string')

    console.log(res)
  })

})