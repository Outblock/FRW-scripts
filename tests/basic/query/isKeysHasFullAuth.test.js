import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test is_keys_has_full_auth script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const publicKeys = ['f8d4fbffb4b97500888c15ebd7ad9221b17d575b6c093b0434361aa9bd9cd04a7290d4b6574c5b732f5fb9f461e312a69a93091b2a030165947b6ea4f467c7a7']
    const res = await executeQuery('basic/isKeysHasFullAuth', [fcl.arg(address, t.Address), fcl.arg(publicKeys, t.Array(t.String))])

    expect(typeof res).toBe('boolean')
    // expect(res).toBe(true)

    console.log(res)
  })

})