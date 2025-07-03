import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get child account ft capabilities', () => {
  test('get child account ft capabilities', async () => {
    setUpFcl()
    const parent = '0xf380b22ef386ac7e'
    const res = await executeQuery('hybridCustody/getChildAccountFTCapabilities', [fcl.arg(parent, t.Address)])
    console.log(res)
    expect(typeof res).toBe('object')
  })
})