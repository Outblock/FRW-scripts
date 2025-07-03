import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('query unclaimed nfts', () => {
  test('query unclaimed nfts', async () => {
    setUpFcl()
    const address = '0x888550b198f39f08'
    const code = await executeQuery('lostAndFound/queryUnclaimedNFTs', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})