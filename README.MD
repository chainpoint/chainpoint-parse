# Important:

If you're looking to parse proofs schemas from the existing Chainpoint V3 Network (chainpoint-services), use version 1.1.0. The latest update is for the unreleased V4 proof schema.

## TODO: Update samples in test/data

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
  "hash":"ffff27222fe366d0b8988b7312c6ba60ee422418d92b62cdcb71fe2991ee7391",
  "proof_id":"66a34bd0-f4e7-11e7-a52b-016a36a9d789",
  "hash_received":"2018-01-09T02:47:15Z",
  "branches":[  
    {  
      "label":"cal_anchor_branch",
      "anchors":[  
        {  
          "type":"cal",
          "anchor_id":"985635",
          "uris":[  
            "https://a.chainpoint.org/calendar/985635/hash"
          ],
          "expected_value":"4690932f928fb7f7ce6e6c49ee95851742231709360be28b7ce2af7b92cfa95b"
        }
      ],
      "branches":[  
        {  
          "label":"btc_anchor_branch",
          "anchors":[  
            {  
              "type":"btc",
              "anchor_id":"503275",
              "uris":[  
                "https://a.chainpoint.org/calendar/985814/data"
              ],
              "expected_value":"c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9"
            }
          ],
          "opReturnValue":"267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b",
          "btcTxId":"ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e",
          "rawTx":"01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000"
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
