import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get apr', () => {
  test('get apr', async () => {
    setUpFcl()
    const code = await executeQuery('staking/getApr', [])
    console.log(code)
    expect(typeof code).toBe('string')
  })
})