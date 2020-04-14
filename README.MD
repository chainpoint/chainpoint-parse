# Important:

This version is for the Chainpoint v4 proof schema. If you're looking to parse proofs from the older Chainpoint V3 Network (chainpoint-services), use version 3.3.1. 

# Chainpoint Parse

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/l/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)
[![npm](https://img.shields.io/npm/v/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)

A Javascript library for parsing a [Chainpoint v4 proof](https://chainpoint.org/) and discovering all anchor points in the proof as well as the expected values to be stored at those anchor points.

Note: This is a low level tool meant for calculating the proof operations and determining the values claimed to be stored at the proof's anchor points. This tool will not perform the actual proof verification against the Chainpoint
Calendar or other public blockchains. It simply calculates locally the values
that you should expect to see in the URI's to validation data provided.

## Installation

```
$ npm install --save chainpoint-parse
```

or

```
yarn add chainpoint-parse
```

## Usage

### Node.js

#### `parse`

This function parses a [Chainpoint v4 proof](https://chainpoint.org/). chainpointProofObject may be a proof in Javascript Object form, Buffer, Hex string, or Base64 string.

```js
const chainpointParse = require('chainpoint-parse')

// Valid proof in JS Object, Buffer, Hex String, or Base64 String form
let chainpointProofObject = {...} 

try {
  let result = chainpointParse.parse(chainpointProofObject)
} catch (error) {
  console.error(`An error has occurred: ${error.message}`)
}
```

### Parse Result Object

The Result object contains basic information about the hash referenced in the proof, and the anchor data for that hash. The anchor data contains both the locations and the value the proof claims shoulds exist at those locations. The original branch structure of the proof is preserved, and the anchor data is included in the approriate branch. For btc_anchor_branch branches, the OP_RETURN value anchored, the BTC transaction id it was included in, and the BTC raw transaction body are also returned.

The following is an example of a parse result object: 
```json
{
  "hash": "ffff27222fe366d0b8988b7312c6ba60ee422418d92b62cdcb71fe2991ee7391",
  "proof_id": "5e0433d0-46da-11ea-a79e-017f19452571",
  "hash_received": "2020-02-03T23:10:28Z",
  "branches": [
    {
      "label": "aggregator",
      "anchors": [],
      "branches": [
        {
          "label": "cal_anchor_branch",
          "anchors": [
            {
              "type": "tcal",
              "anchor_id": "7159fe850b6ddb51ff50dc4d44b1aa363128e52ad49f21fd68b1cd0c77afa64d",
              "uris": [
                "http://3.135.54.225/calendar/7159fe850b6ddb51ff50dc4d44b1aa363128e52ad49f21fd68b1cd0c77afa64d/data"
              ],
              "expected_value": "f472ed9ff3018dfd499d7b2cd8f1fc7905c4b7204bac2bd7050b153391987ca6"
            }
          ],
          "branches": [
            {
              "label": "btc_anchor_branch",
              "anchors": [
                {
                  "type": "tbtc",
                  "anchor_id": "1664848",
                  "uris": [
                    "http://3.135.54.225/calendar/1eedc4483110bc656cf21e39a8b77041798ef49b8b0a5cd266f3060d81087fb7/data"
                  ],
                  "expected_value": "d0249268f4929fe044bcd476952a5f4496e031571c5d48c41c0e3295fd9c8b86"
                }
              ],
              "opReturnValue": "f712f74a8a52de37fa1fc71a659585f2fe8536c70dd17f65848f275de3ca2900",
              "btcTxId": "51560437696be945d222ee32a05da3ad57457436567d59c3e7f7066382e0ab91",
              "rawTx": "0100000001161056cfe33bb565f50cff84e30b5d14720d4a7172ab246be96f3d28ba22b8810000000000ffffffff020000000000000000226a20f712f74a8a52de37fa1fc71a659585f2fe8536c70dd17f65848f275de3ca290008e0ee0500000000160014a2ae5c0fec0e93b33d25909f42b24877376d25cc00000000"
            }
          ]
        }
      ]
    }
  ]
}
```

The parse result object is similar to the original proof in most ways. The key difference is that all the hash operations have been performed and extracted from the proof. The `expected_value` is inserted for each anchor point as a result of these calculations. With these `expected_value` determined, you can proceed to validate these anchor claims against an external blockchain source.

NOTE: The `expected_value` byte order is reversed for all BTC anchor results. This is because all hashes and calculations in a Chainpoint proof are in big endian byte order, but BTC Merkle root values are in little endian byte order in Bitcoin, and as a result, in the Tierion Calendar as well. The value must be reversed before any comparisons are made.


### Browser

You can copy `bundle.js` into your app to include in a script tag.

Or install the npm package in a place available to your web pages and set the script `src` tag to something like the following. A window global function `chainpointParse.parse()` will be available and operate the same as the Node.js example above.


```
<script src="./node_modules/chainpoint-parse/bundle.js">

```
