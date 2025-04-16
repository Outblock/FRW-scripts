import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl, { authz } from '@onflow/fcl'
import { getAuthz } from '../../utils/authz.js'
import { address, pk } from '../../config/constants.js'

import {
  executeQuery,
  executeTransaction,
  // exportScripts
} from '@/index'
import { setUpFcl } from '../../utils'


describe('Test empty transaction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Empty transactions test', async () => {

    let authz = getAuthz(address, pk)

    const res = await executeTransaction('temp/testTrans', [], { authz })

    expect(res.length).toBe(64)
    // expect(res.address).toBe(address)
    // expect(res).toHaveProperty('balance')
    // expect(res).toHaveProperty('availableBalance')
    // expect(res).toHaveProperty('storageUsed')
    // expect(res).toHaveProperty('storageCapacity')
    // expect(res).toHaveProperty('storageFlow')

  })

})