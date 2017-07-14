# Chainpoint Parse

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![npm](https://img.shields.io/npm/l/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)
[![npm](https://img.shields.io/npm/v/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)

A Javascript library for parsing a [Chainpoint v3 proof](https://chainpoint.org/) and discovering all anchor points in the proof as well as the expected values to be stored at those anchor points.

Note: This is a low level tool meant for calculating the proof operations and determining the values claimed to be stored at the proof's anchor points. This tool will not perform proof verification.

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

### Parse Result Object

The Result object contains basic information about the hash referenced in the proof, and the anchor data for that hash. The anchor data contains both the locations and the value the proof claims shoulds exist at those locations. The original branch structure of the proof is preserved, and the anchor data is included in the approriate branch.

The following is an example of a parse result object: 
```json
{
  "hash":"bdf8c9bdf076d6aff0292a1c9448691d2ae283f2ce41b045355e2c8cb8e85ef2",
  "hash_id_node": "5cf0a860-0f52-11e7-947d-7fde4e7ca024",
  "hash_submitted_node_at": "2017-03-23T11:30:33Z",
  "hash_id_core": "e6bf9cc1-67dd-11e7-af4a-e7bc0011940a",
  "hash_submitted_core_at": "2017-07-13T15:14:02Z",
  "branches": [
    {
      "label":"root_branch",
      "anchors": [
        {
          "type":"cal",
          "anchor_id":"1027",
          "uris": [
            "http://a.cal.chainpoint.org/1027/root",
            "http://b.cal.chainpoint.org/1027/root"
          ],
          "expected_value":"51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a"
        }
      ]
    }
  ]
}
```

The parse result object is similar to the original proof in most ways. The key difference is that all the hash operations have been performed and extracted from the proof. The expected\_values are inserted for each anchor point as a result of these calculations. With these expected\_values determined, one can proceed to validate these anchor claims against the external blockchain sources.


### Browser

Note : You can copy `bundle.js` into your app to include in a script tag, or use the [http://rawgit.com/](http://rawgit.com/) CDN version (make sure the Git commit SHA1 in the URL is current). Rawgit is a free service and makes no guarantees for uptime.

```
  <script src="https://cdn.rawgit.com/chainpoint/chainpoint-parse/CURRENT-PROJECT-SHA1-HERE/bundle.js"></script>

```

Or install the npm package in a place available to your web pages and set the script `src` tag to something like the following. A set of window global functions `chainpointParse.parseObject()` and `chainpointParse.parseBinary()` will be available and operate the same as the Node.js example above.


```
<script src="./node_modules/chainpoint-parse/bundle.js">

```
