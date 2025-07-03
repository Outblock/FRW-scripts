import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get nft displays', () => {
  test('get nft displays', async () => {
    setUpFcl()
    const address = '0xf380b22ef386ac7e'
    const collectionPath = 'KlktnNFTCollection'
    const ids = [3232]
    const code = await executeQuery('collection/getNFTDisplays', [fcl.arg(address, t.Address), fcl.arg(collectionPath, t.String), fcl.arg(ids, t.Array(t.UInt64))])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})