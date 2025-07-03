import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import {
  executeQuery,
} from '@/index'
import { setUpFcl } from '../../utils'

describe('Test get_associated_flow_identifier script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setUpFcl()
  })

  it('Associated Flow identifier should return when query by script', async () => {

    const address = '0x7f27352d5f83db87a5a3e00f4b07cc2138d8ee52'
    const res = await executeQuery('bridges/getAssociatedFlowIdentifier', [fcl.arg(address, t.String)])

    expect(typeof res).toBe('string')

    console.log(res)
  })

})