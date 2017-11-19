# Chainpoint Parse

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![npm](https://img.shields.io/npm/l/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)
[![npm](https://img.shields.io/npm/v/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)

A Javascript library for parsing a [Chainpoint v3 proof](https://chainpoint.org/) and discovering all anchor points in the proof as well as the expected values to be stored at those anchor points.

Note: This is a low level tool meant for calculating the proof operations and determining the values claimed to be stored at the proof's anchor points. This tool will not perform the actual proof verification against the Chainpoint
Calendar or other public blockchains. It simply calculates locally the values
that you should expect to see in the URI's to validation data provided.

## Demo

Please try the RunKit live code notebook demonstration showing the
process of submitting hashes and verifying proofs using live code.

https://runkit.com/grempe/create-and-verify-a-chainpoint-proof 

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

#### `parseObject`

This function parses a [Chainpoint v3 proof](https://chainpoint.org/) in Javascript Object form.

```js
const chainpointParse = require('chainpoint-parse')

// Valid proof in JS Object form
let chainpointProofObject = {...} 

chainpointParse.parseObject(chainpointProofObject, function (err, result) {
    if (err) {
      // if an error occurs, the error message will return here
    } else {
      // result will be an object summarizing the anchor claims in the proof
    }
})
```

#### `parseObjectSync`

```js
const chainpointParse = require('chainpoint-parse')

// Valid proof in JS Object form
let chainpointProofObject = {...} 

try {
  let result = chainpointParse.parseObjectSync(chainpointProofObject)
} catch (error) {
  console.error(`An error has occurred: ${error.message}`)
}
```

#### `parseBinary`

This function parses a [Chainpoint v3 proof](https://chainpoint.org/) in Chainpoint Binary form, including Buffer, Hex string, or Base64 variants.

```js
const chainpointParse = require('chainpoint-parse')

// Valid proof in Buffer, Hex String, or Base64 String form
let chainpointProofBinaryBuffer = [...] 

chainpointParse.parseBinary(chainpointProofBinaryBuffer, function (err, result) {
    if (err) {
      // if an error occurs, the error message will return here
    } else {
      // result will be an object summarizing the anchor claims in the proof
    }
})
```

#### `parseBinarySync`

```js
const chainpointParse = require('chainpoint-parse')

// Valid proof in Buffer, Hex String, or Base64 String form
let chainpointProofBinaryBuffer = [...] 

try {
  let result = chainpointParse.parseBinarySync(chainpointProofBinaryBuffer)
} catch (error) {
  console.error(`An error has occurred: ${error.message}`)
}
```

### Parse Result Object

The Result object contains basic information about the hash referenced in the proof, and the anchor data for that hash. The anchor data contains both the locations and the value the proof claims shoulds exist at those locations. The original branch structure of the proof is preserved, and the anchor data is included in the approriate branch.

The following is an example of a parse result object: 
```json
{
  "hash": "9d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0c",
  "hash_id_node": "9ecff531-cce7-11e7-8d12-01b034822bb7",
  "hash_submitted_node_at": "2017-11-19T05:08:03Z",
  "hash_id_core": "9f699d20-cce7-11e7-9043-01a1b9a40a38",
  "hash_submitted_core_at": "2017-11-19T05:08:04Z",
  "branches": [
    {
      "label": "cal_anchor_branch",
      "anchors": [
        {
          "type": "cal",
          "anchor_id": "643162",
          "uris": [
            "https://c.chainpoint.org/calendar/643162/hash"
          ],
          "expected_value": "6335b36006266f2a1b25ff8f754d80b2d2dc8efa49c730eb82c9359feef99eb4"
        }
      ]
    }
  ]
}
```

The parse result object is similar to the original proof in most ways. The key difference is that all the hash operations have been performed and extracted from the proof. The `expected_value` is inserted for each anchor point as a result of these calculations. With these `expected_value` determined, you can proceed to validate these anchor claims against an external blockchain source.


### Browser

Note : You can copy `bundle.js` into your app to include in a script tag, or use the [http://rawgit.com/](http://rawgit.com/) CDN version (make sure the Git commit SHA1 in the URL is current). Rawgit is a free service and makes no guarantees for uptime.

```
  <script src="https://cdn.rawgit.com/chainpoint/chainpoint-parse/CURRENT-PROJECT-SHA1-HERE/bundle.js"></script>

```

Or install the npm package in a place available to your web pages and set the script `src` tag to something like the following. A set of window global functions `chainpointParse.parseObject()` and `chainpointParse.parseBinary()` will be available and operate the same as the Node.js example above.


```
<script src="./node_modules/chainpoint-parse/bundle.js">

```
