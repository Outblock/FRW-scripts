import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get contract by name', () => {
  test('get contract by name', async () => {
    setUpFcl()
    const address = '0xf233dcee88fe0abe'
    const contractName = 'FungibleToken'
    const code = await executeQuery('contract/getContractByName', [fcl.arg(address, t.Address), fcl.arg(contractName, t.String)])
    console.log(code)
    expect(typeof code).toBe('string')
  })
})