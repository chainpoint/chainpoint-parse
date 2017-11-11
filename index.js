/* Copyright 2017 Tierion
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const crypto = require('crypto')
const sha3512 = require('js-sha3').sha3_512
const sha3384 = require('js-sha3').sha3_384
const sha3256 = require('js-sha3').sha3_256
const sha3224 = require('js-sha3').sha3_224
const chpSchema = require('chainpoint-proof-json-schema')
const chpBinary = require('chainpoint-binary')

exports.parseObject = (chainpointObject, callback) => {
  let schemaCheck = chpSchema.validate(chainpointObject)
  if (!schemaCheck.valid) return callback(schemaCheck.errors)

  // initialize the result object
  let result = {}
  // identify this result set with the basic information on the hash
  result.hash = chainpointObject.hash
  result.hash_id_node = chainpointObject.hash_id_node
  result.hash_submitted_node_at = chainpointObject.hash_submitted_node_at
  result.hash_id_core = chainpointObject.hash_id_core
  result.hash_submitted_core_at = chainpointObject.hash_submitted_core_at
  // acquire all anchor points and calcaulte expected values for all branches, recursively
  result.branches = parseBranches(chainpointObject.hash, chainpointObject.branches)
  return callback(null, result)
}

exports.parseBinary = (chainpointBinary, callback) => {
  let proofObject
  try {
    proofObject = chpBinary.binaryToObjectSync(chainpointBinary)
  } catch (error) {
    return callback(error)
  }
  return this.parseObject(proofObject, callback)
}

function parseBranches (startHash, branchArray) {
  var branches = []
  var currentHashValue = Buffer.from(startHash, 'hex')

  // iterate through all branches in the current branch array
  for (var b = 0; b < branchArray.length; b++) {
    // initialize anchors array for this branch
    let anchors = []
    // iterate through all operations in the operations array for this branch
    let currentbranchOps = branchArray[b].ops
    for (var o = 0; o < currentbranchOps.length; o++) {
      if (currentbranchOps[o].r) {
        // hex data gets treated as hex, otherwise it is converted to bytes assuming a ut8 encoded string
        let concatValue = isHex(currentbranchOps[o].r) ? Buffer.from(currentbranchOps[o].r, 'hex') : Buffer.from(currentbranchOps[o].r, 'utf8')
        currentHashValue = Buffer.concat([currentHashValue, concatValue])
      } else if (currentbranchOps[o].l) {
        // hex data gets treated as hex, otherwise it is converted to bytes assuming a ut8 encoded string
        let concatValue = isHex(currentbranchOps[o].l) ? Buffer.from(currentbranchOps[o].l, 'hex') : Buffer.from(currentbranchOps[o].l, 'utf8')
        currentHashValue = Buffer.concat([concatValue, currentHashValue])
      } else if (currentbranchOps[o].op) {
        switch (currentbranchOps[o].op) {
          case 'sha-224':
            currentHashValue = crypto.createHash('sha224').update(currentHashValue).digest()
            break
          case 'sha-256':
            currentHashValue = crypto.createHash('sha256').update(currentHashValue).digest()
            break
          case 'sha-384':
            currentHashValue = crypto.createHash('sha384').update(currentHashValue).digest()
            break
          case 'sha-512':
            currentHashValue = crypto.createHash('sha512').update(currentHashValue).digest()
            break
          case 'sha3-224':
            currentHashValue = Buffer.from(sha3224.array(currentHashValue))
            break
          case 'sha3-256':
            currentHashValue = Buffer.from(sha3256.array(currentHashValue))
            break
          case 'sha3-384':
            currentHashValue = Buffer.from(sha3384.array(currentHashValue))
            break
          case 'sha3-512':
            currentHashValue = Buffer.from(sha3512.array(currentHashValue))
            break
          case 'sha-256-x2':
            currentHashValue = crypto.createHash('sha256').update(currentHashValue).digest()
            currentHashValue = crypto.createHash('sha256').update(currentHashValue).digest()
            break
        }
      } else if (currentbranchOps[o].anchors) {
        anchors = anchors.concat(parseAnchors(currentHashValue, currentbranchOps[o].anchors))
      }
    }

    let branchObj = {
      label: branchArray[b].label || undefined,
      anchors: anchors
    }
    if (branchArray[b].branches) branchObj.branches = parseBranches(currentHashValue.toString('hex'), branchArray[b].branches)
    branches.push(branchObj)
  }

  return branches
}

function parseAnchors (currentHashValue, anchorsArray) {
  var anchors = []
  for (var x = 0; x < anchorsArray.length; x++) {
    anchors.push(
      {
        type: anchorsArray[x].type,
        anchor_id: anchorsArray[x].anchor_id,
        uris: anchorsArray[x].uris || undefined,
        expected_value: currentHashValue.toString('hex')
      }
    )
  }
  return anchors
}

function isHex (value) {
  var hexRegex = /^[0-9A-Fa-f]{2,}$/
  var result = hexRegex.test(value)
  if (result) result = !(value.length % 2)
  return result
}
