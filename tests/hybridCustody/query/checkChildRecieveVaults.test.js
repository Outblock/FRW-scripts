import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('check child recieve vaults', () => {
  test('check child recieve vaults', async () => {
    setUpFcl()
    const parent = '0xf380b22ef386ac7e'
    const child = '0x8e5a02ccc537163f'
    const path = 'flowTokenVault'

    const res = await executeQuery('hybridCustody/checkChildRecieveVaults', [fcl.arg(parent, t.Address), fcl.arg(child, t.Address), fcl.arg(path, t.String)])
    expect(typeof res).toBe('boolean')
  })
})