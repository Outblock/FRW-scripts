# outblock/frw-scripts

## Query script with script path

```javascript
// with fcl config

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { send as httpSend } from "@onflow/transport-http";

import { executeQuery } from "@outblock/frw-scripts";

const fclInit = () => {
  return fcl
    .config()
    .put("sdk.transport", httpSend)
    .put("accessNode.api", "https://rest-mainnet.onflow.org")
    .put("0xNonFungibleToken", "0x1d7e57aa55817448")
    .put("0xMetadataViews", "0x1d7e57aa55817448")
    .put("0xFungibleToken", "0xf233dcee88fe0abe")
    .put("0xFlowToken", "0x1654653399040a61");
};

// ....

// script path is folder/scriptName.cdc with CamelCase
const res = await executeQuery("staking/getApr", [], {});
console.log(res);
```

## Export scripts

```javascript
import { exportQueries } from "@outblock/frw-scripts";

// export all query scripts mapping
const scripts = await exportQueries();
// or with address mapping
const scripts = await exportQueries({
  "0xFlowIDTableStaking": "0x8624b52f9ddcd04a", // FlowIDTableStaking address replace
  // ....
});

// return {folder: {scriptName: scriptContent}}

// export single script
const script = await exportQuery("bridges/calculateBridgeFee", {
  "0xFlowEVMBridge": "0x1e4aa0b87d10b141", // FlowIDTableStaking address replace
});

// return scriptContent
```

## Execute transction with script path

```javascript
// with fcl config

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { send as httpSend } from "@onflow/transport-http";

import { executeTransaction } from "@outblock/frw-scripts";

const fclInit = () => {
  return fcl
    .config()
    .put("sdk.transport", httpSend)
    .put("accessNode.api", "https://rest-mainnet.onflow.org")
    .put("0xNonFungibleToken", "0x1d7e57aa55817448")
    .put("0xMetadataViews", "0x1d7e57aa55817448")
    .put("0xFungibleToken", "0xf233dcee88fe0abe")
    .put("0xFlowToken", "0x1654653399040a61");
};

// ....

// script path is folder/scriptName.cdc with CamelCase
const res = await executeTransaction(
  "basic/temp",
  [], // args
  { authz: fcl.authz }, // authz
  {
    // address mapping
    "0xFlowIDTableStaking": "0x8624b52f9ddcd04a",
  }
);
console.log(res); // txId
```

## Export scripts

```javascript
import { exportTransactions } from "@outblock/@outblock/frw-scripts";

// export all transactions mapping
const scripts = await exportTransactions();
// or with address mapping
const scripts = await exportTransactions({
  "0xFlowIDTableStaking": "0x8624b52f9ddcd04a", // FlowIDTableStaking address replace
  // ....
});

// return {folder: {scriptName: scriptContent}}

// export single script
const script = await exportTransaction("bridges/onboardByTypeIdentifier", {
  "0xFlowEVMBridge": "0x1e4aa0b87d10b141", // FlowIDTableStaking address replace
});

// return scriptContent
```
