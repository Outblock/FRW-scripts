import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get delegator info', () => {
  test('get delegator info', async () => {
    setUpFcl()
    const id = 'fffba108a52e4ca8f5d30658c3f03f47ad1cc13a0995435c0532336236813218'
    const code = await executeQuery('staking/getDelegatorInfo', [fcl.arg(id, t.String), fcl.arg(1, t.UInt32)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})