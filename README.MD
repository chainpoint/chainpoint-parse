# Chainpoint Parse

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![npm](https://img.shields.io/npm/l/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)
[![npm](https://img.shields.io/npm/v/chainpoint-parse.svg)](https://www.npmjs.com/package/chainpoint-parse)

A Javascript library for parsing a [Chainpoint v3 proof](https://chainpoint.org/) and discovering all anchor points in the proof as well as the expected values to be stored at those anchor points.

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

#### `objectToBinary`

This function converts a Chainpoint proof in JSON String or Javascript Object form to a Buffer containing the standard binary form. The incoming Object will be validated against
the formal [Chainpoint Proof JSON Schema](https://github.com/chainpoint/chainpoint-proof-json-schema).

```js
const cpb = require('chainpoint-binary')

// Valid proof in JSON or JS Object form
let chainpointProofObject = {...} 

cpb.objectToBinary(chainpointProofObject, function (err, proofBinary) {
    if (err) {
      // if an error occurs, the error message will return here
    } else {
      // proofBinary is a Buffer representing the binary form of a Chainpoint proof
    }
})
```

#### `objectToBase64`

This function converts a Chainpoint proof in JSON String or Javascript Object form to a Base64 encoded string of the standard binary form. The incoming Object will be validated against
the formal [Chainpoint Proof JSON Schema](https://github.com/chainpoint/chainpoint-proof-json-schema).

```js
const cpb = require('chainpoint-binary')

// Valid proof in JSON or JS Object form
let chainpointProofObject = {...} 

cpb.objectToBase64(chainpointProofObject, function (err, proofBase64) {
    if (err) {
      // if an error occurs, the error message will return here
    } else {
      // proofBase64 is a Base64 encoded string representing the binary form of a Chainpoint proof
    }
})
```

#### `binaryToObject`

This function converts a Chainpoint binary proof to a Javascript Object. A Hexadecimal string or Base64 string in place of a Buffer is also acceptable as input. The outgoing Object will be validated against the formal [Chainpoint Proof JSON Schema](https://github.com/chainpoint/chainpoint-proof-json-schema) before being returned.

```js
const cpb = require('chainpoint-binary')

// Valid proof in Buffer, Hex String, or Base64 String form
let chainpointProofBinaryBuffer = [...] 

cpb.binaryToObject(chainpointProofBinaryBuffer, function (err, proofObject) {
    if (err) {
      // if an error occurs, the error message will return here
    } else {
      // proofObject contains the Javascript Object form of a Chainpoint proof
      // Wrap this with JSON.stringify() for the JSON form as needed.
    }
})
```

### Browser

Note : You can copy `docs/bundle.js` into your app to include in a script tag, or use the [http://rawgit.com/](http://rawgit.com/) CDN version (make sure the Git commit SHA1 in the URL is current). Rawgit is a free service and makes no guarantees for uptime.

```
  <script src="https://cdn.rawgit.com/chainpoint/chainpoint-parse/CURRENT-PROJECT-SHA1-HERE/docs/bundle.js"></script>

```

Or install the npm package in a place available to your web pages and set the script `src` tag to something like the following. A set of window global functions `chainpointParse.parseObject()` and `chainpointParse.parseBinary()` will be available and operate the same as the Node.js example above.


```
<script src="./node_modules/chainpoint-parse/docs/bundle.js">

```
