import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_contract_by_name script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Contract should return when query by script', async () => {

    const address = '0xf233dcee88fe0abe'
    const contractName = 'FungibleToken'
    const res = await executeQuery('basic/getContractByName', [fcl.arg(address, t.Address), fcl.arg(contractName, t.String)])

    expect(res).not.toBe(null)

  })

})