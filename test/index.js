/* global describe, it */

const should = require('should')
const chpParse = require('../index')
const fs = require('fs')
const chpBinary = require('chainpoint-binary')

describe('Using a valid chainpoint v3 JSON file, parse as Object', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parse(JSON.parse(jsonSample))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      'c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v3 JSON file, parse as Buffer', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof)
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      'c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v3 JSON file, parse as Hex string', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof.toString('hex'))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      'c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v3 binary Base 64 file, parse as Base64', function() {
  it('should return expected results', function(done) {
    let b64Sample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.b64', 'utf-8')
    should.exist(b64Sample)
    let result = chpParse.parse(b64Sample)
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      'c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v3 testnet JSON file, parse as Object', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v3-t.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parse(JSON.parse(jsonSample))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      'c617f5faca34474bea7020d75c39cb8427a32145f9646586ecb9184002131ad9'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1b'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'ba3c8c3e547ed73471c28a69659373f3f0a3b726aab31cdecd14513d9c581f1e'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000013d9bfb8c553b3a7c9c030ea9b0f47c7e4c457e47a1ad2d9c751c8eb0e02fee70010000006a47304402201eac07288c3881f354564bb9da0d8267174cdc9e8c42ca82c2129a0416c806220220104e9932a89259472c84be7722f77324efa43a65ca79dd5bb8b6aab0ac9788000121032695ca0d3c0f7f8082a6ef66e7127e48d4eb99bef86be99432b897c485962fa8ffffffff020000000000000000226a20267335262e21e7adb4220068b4b90b7ff066324935d7f61ceab2a64080b06b1bca694202000000001976a9149f1f4038857beedd34cc5ba9f26ac7a20c04d51988ac00000000'
    )
    done()
  })
})
