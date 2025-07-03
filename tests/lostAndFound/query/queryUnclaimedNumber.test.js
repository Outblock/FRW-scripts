import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('query unclaimed number', () => {
  test('query unclaimed number', async () => {
    setUpFcl()
    const address = '0x888550b198f39f08'
    const code = await executeQuery('lostAndFound/queryUnclaimedNumber', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(typeof code).toBe('string')
  })
})