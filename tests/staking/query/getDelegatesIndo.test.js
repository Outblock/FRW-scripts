import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get delegates indo', () => {
  test('get delegates indo', async () => {
    setUpFcl()
    const address = '0x707adbad1428c624'
    const code = await executeQuery('staking/getDelegatesIndo', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})