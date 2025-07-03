import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get accessible child account nfts', () => {
  test('get accessible child account nfts', async () => {
    setUpFcl()
    const parent = '0xf380b22ef386ac7e'
    const res = await executeQuery('hybridCustody/getAccessibleChildAccountNFTs', [fcl.arg(parent, t.Address)])
    console.log(res)
    expect(typeof res).toBe('object')
  })
})