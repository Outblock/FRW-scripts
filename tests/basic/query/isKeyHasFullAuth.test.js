import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test is_key_has_full_auth script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Should return boolean when query by script', async () => {

    const address = '0xf380b22ef386ac7e'
    const publicKey = '26b50eef16c378f14a7f91d5d681c9d418962254b50b58d9ec0d042021f66478e1d07ea9aa3339edfd465b60d0a4366abaa0df416ab5749cd28ff0ba129df960'
    const res = await executeQuery('basic/isKeyHasFullAuth', [fcl.arg(address, t.Address), fcl.arg(publicKey, t.String)])

    expect(typeof res).toBe('boolean')

    console.log(res)
  })

})