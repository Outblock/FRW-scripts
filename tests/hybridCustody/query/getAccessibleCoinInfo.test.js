import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get accessible coin info', () => {
  test('get accessible coin info', async () => {
    setUpFcl()
    const parent = '0xf380b22ef386ac7e'
    const child = '0x8e5a02ccc537163f'
    const res = await executeQuery('hybridCustody/getAccessibleCoinInfo', [fcl.arg(parent, t.Address), fcl.arg(child, t.Address)])
    console.log(res)
    expect(typeof res).toBe('object')
  })
})