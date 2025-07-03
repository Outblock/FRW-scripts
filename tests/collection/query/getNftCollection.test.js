import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get nft collection', () => {
  test('get nft collection', async () => {
    setUpFcl()
    const address = '0xf380b22ef386ac7e'
    const pathId = 'KlktnNFTCollection'
    const code = await executeQuery('collection/getNFTCollection', [fcl.arg(address, t.Address), fcl.arg(pathId, t.String)])
    console.log(code)
     expect(typeof code).toBe('object')
  })
})