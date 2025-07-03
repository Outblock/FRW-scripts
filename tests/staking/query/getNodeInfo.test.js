import { vitest, describe, test, expect } from 'vitest'
import {
  executeQuery,
} from '@/index'
import * as t from '@onflow/types'
import fcl from '@onflow/fcl'
import { setUpFcl } from '../../utils'

describe('get node info', () => {
  test('get node info', async () => {
    setUpFcl()
    const nodeId = '3c6519ba8be35e338df7273a895ad3abaeb0c232eb908ee7b05462018c112fe1'
    const code = await executeQuery('staking/getNodeInfo', [fcl.arg(nodeId, t.String)])
    console.log(code)
    expect(typeof code).toBe('object')
  })
})