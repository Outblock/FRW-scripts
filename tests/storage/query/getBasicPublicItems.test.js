import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get basic public items', () => {
  test('get basic public items', async () => {
    setUpFcl()
    const address = '0x55ad22f01ef568a1'
    const code = await executeQuery('storage/getBasicPublicItems', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(Array.isArray(code)).toBe(true)
  })
})