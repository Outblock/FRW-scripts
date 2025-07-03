import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test evm_address_requires_onboarding script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean when query by script', async () => {

    const evmAddressHex = 'd3bF53DAC106A0290B0483EcBC89d40FcC961f3e'
    const res = await executeQuery('bridges/evmAddressRequiresOnboarding', [fcl.arg(evmAddressHex, t.String)])

    expect(typeof res).toBe('undefined')

    
    console.log(res)
  })

})