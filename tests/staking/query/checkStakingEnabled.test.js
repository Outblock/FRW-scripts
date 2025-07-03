import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('check staking enabled', () => {
  test('check staking enabled', async () => {
    setUpFcl()
    const code = await executeQuery('staking/checkStakingEnabled', [])
    console.log(code)
    expect(typeof code).toBe('boolean')
  })
})