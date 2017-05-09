const crypto = require('crypto')
const sha3512 = require('js-sha3').sha3_512
const sha3384 = require('js-sha3').sha3_384
const sha3256 = require('js-sha3').sha3_256
const sha3224 = require('js-sha3').sha3_224
const chpSchema = require('chainpoint-proof-json-schema')
const chpBinary = require('chainpoint-binary')
const rgxs = require('./rgxs')

exports.parseObject = (chainpointObject, callback) => {
  let schemaCheck = chpSchema.validate(chainpointObject)
  if (!schemaCheck.valid) return callback(schemaCheck.errors)

  // initizlize the result object
  let result = {}
  // identify this result set with the basic information on the hash
  result.hash = chainpointObject.hash
  result.hash_id = chainpointObject.hash_id
  result.hash_submitted_at = chainpointObject.hash_submitted_at
  // acquire all anchor points and calcaulte expected values for all branches, recursively
  result.branches = parseBranches(chainpointObject.hash, chainpointObject.branches)
  return callback(null, result)
}

exports.parseBinary = (chainpointBinary, callback) => {
  chpBinary.binaryToObject(chainpointBinary, (err, proofObject) => {
    if (err) return callback(err)
    return this.parseObject(proofObject, callback)
  })
}

function parseBranches (startHash, branchArray) {
  var branches = []
  var currentHashValue = new Buffer(startHash, 'hex')

  // iterate through all branches in the current branch array
  for (var b = 0; b < branchArray.length; b++) {
    // initialize anchors array for this branch
    let anchors = []
    // iterate through all operations in the operations array for this branch
    let currentbranchOps = branchArray[b].ops
    for (var o = 0; o < currentbranchOps.length; o++) {
      if (currentbranchOps[o].r) {
        // hex data gets treated as hex, otherwise it is converted to bytes assuming a ut8 encoded string
        let concatValue = rgxs.isHex(currentbranchOps[o].r) ? Buffer.from(currentbranchOps[o].r, 'hex') : Buffer.from(currentbranchOps[o].r, 'utf8')
        currentHashValue = Buffer.concat([currentHashValue, concatValue])
      } else if (currentbranchOps[o].l) {
        // hex data gets treated as hex, otherwise it is converted to bytes assuming a ut8 encoded string
        let concatValue = rgxs.isHex(currentbranchOps[o].l) ? Buffer.from(currentbranchOps[o].l, 'hex') : Buffer.from(currentbranchOps[o].l, 'utf8')
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
            currentHashValue = new Buffer(sha3224.array(currentHashValue))
            break
          case 'sha3-256':
            currentHashValue = new Buffer(sha3256.array(currentHashValue))
            break
          case 'sha3-384':
            currentHashValue = new Buffer(sha3384.array(currentHashValue))
            break
          case 'sha3-512':
            currentHashValue = new Buffer(sha3512.array(currentHashValue))
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
