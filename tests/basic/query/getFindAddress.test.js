import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_find_address script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Find address should return when query by script', async () => {

    const name = 'lilico'
    const res = await executeQuery('basic/getFindAddress', [fcl.arg(name, t.String)])

    expect(res).not.toBe(null)

    console.log(res)
  })

})