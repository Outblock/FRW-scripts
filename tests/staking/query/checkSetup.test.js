import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('check setup', () => {
  test('check setup', async () => {
    setUpFcl()
    const address = '0x707adbad1428c624'
    const code = await executeQuery('staking/checkSetup', [fcl.arg(address, t.Address)])
    console.log(code)
    expect(typeof code).toBe('boolean')
  })
})