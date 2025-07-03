import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get nft metadata views', () => {
  test('get nft metadata views', async () => {
    setUpFcl()
    const address = '0xe8264050e6f51923'
    const collectionPath = 'MomentCollection'
    const ids = 4563995
    const code = await executeQuery('collection/getNFTMetadataViews', [fcl.arg(address, t.Address), fcl.arg(collectionPath, t.String), fcl.arg(ids, t.UInt64)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})