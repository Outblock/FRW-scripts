import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get child addresses', () => {
  test('get child addresses', async () => {
    setUpFcl()
    const address = '0xf380b22ef386ac7e'
    const code = await executeQuery('hybridCustody/getChildAddresses', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(Array.isArray(code)).toBe(true)
  })
})