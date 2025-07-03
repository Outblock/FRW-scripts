import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test type_requires_onboarding_by_identifier script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean when query by script', async () => {

    const identifier = 'A.2d4c3caffbeab845.FLOAT.NFT'
    const res = await executeQuery('bridges/typeRequiresOnboardingByIdentifier', [fcl.arg(identifier, t.String)])

    expect(typeof res).toBe('boolean')
    expect(res).toBe(false)

    console.log(res)
  })

})