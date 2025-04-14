import * as fcl from '@onflow/fcl'
import { send as httpSend } from '@onflow/transport-http'

export const setUpFcl = async (network = 'mainnet', addressMaps = {}) => {


  const fclConfig = fcl
    .config()

  if (network == 'testnet') {
    fclConfig.put('accessNode.api', 'https://rest-testnet.onflow.org')
  }
  else {
    fclConfig.put('sdk.transport', httpSend)
      .put('accessNode.api', 'https://rest-mainnet.onflow.org')
      .put('0xNonFungibleToken', '0x1d7e57aa55817448')
      .put('0xMetadataViews', '0x1d7e57aa55817448')
      .put('0xFungibleToken', '0xf233dcee88fe0abe')
      .put('0xFlowToken', '0x1654653399040a61')
  }


  for (const key in Object.keys(addressMaps)) {
    fclConfig.put(key, addressMaps[key])
  }

  return fclConfig
}
