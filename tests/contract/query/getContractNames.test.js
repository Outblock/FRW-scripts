import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get contract names', () => {
  test('get contract names', async () => {
    setUpFcl()
    const address = '0xf233dcee88fe0abe'
    const code = await executeQuery('contract/getContractNames', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(Array.isArray(code)).toBe(true)
  })
})