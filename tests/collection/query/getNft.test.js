import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get nft', () => {
  test('get nft', async () => {
    setUpFcl()
    const address = '0xf380b22ef386ac7e'
    const collectionPath = 'KlktnNFTCollection'
    const ids = [3232]
    const code = await executeQuery('collection/getNFT', [fcl.arg(address, t.Address), fcl.arg(collectionPath, t.String), fcl.arg(ids, t.Array(t.UInt64))])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})