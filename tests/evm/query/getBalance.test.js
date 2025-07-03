import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_balance script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return balance when query by script', async () => {

    const address = '00000000000000000000000266ddb89aaaae0ca0'
    const res = await executeQuery('evm/getBalance', [fcl.arg(address, t.String)])

    expect(typeof res).toBe('string')

    console.log(res)
  })

})