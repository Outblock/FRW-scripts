import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('query unclaimed fts', () => {
  test('query unclaimed fts', async () => {
    setUpFcl()
    const address = '0x25db6bb2321e300c'
    const code = await executeQuery('lostAndFound/queryUnclaimedFTs', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})