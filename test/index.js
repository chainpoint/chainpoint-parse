/* global describe, it */

const should = require('should')
const chpParse = require('../index')
const fs = require('fs')
const chpBinary = require('chainpoint-binary')

describe('Using a valid chainpoint v4 JSON file, parse as Object', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v4.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parse(JSON.parse(jsonSample))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(0)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors[0].expected_value.should.equal(
      'e8886527b676a2d835e8fd8417b3884c0158ff7ec38647012fe15f5ae448d825'
    )
    should.not.exist(result.branches[0].branches[0].branches[0].branches)
    result.branches[0].branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].branches[0].opReturnValue.should.equal(
      '334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01'
    )
    result.branches[0].branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].branches[0].btcTxId.should.equal(
      '96bbb4b7c00b3e91810633bdccbca2c3e81da9b57ffde642853732e540b6f40c'
    )
    result.branches[0].branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].branches[0].rawTx.should.equal(
      '010000000160ddcd2a591a36e1c8f350c499d86bd80d38fc26d44d98536fcd5cd039d07aed0100000000ffffffff020000000000000000226a20334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01aef6320000000000160014ea7348e6c85578e63dd08904f09893fb77e4309100000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v4 JSON file, parse as Buffer', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v4.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof)
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(0)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors[0].expected_value.should.equal(
      'e8886527b676a2d835e8fd8417b3884c0158ff7ec38647012fe15f5ae448d825'
    )
    should.not.exist(result.branches[0].branches[0].branches[0].branches)
    result.branches[0].branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].branches[0].opReturnValue.should.equal(
      '334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01'
    )
    result.branches[0].branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].branches[0].btcTxId.should.equal(
      '96bbb4b7c00b3e91810633bdccbca2c3e81da9b57ffde642853732e540b6f40c'
    )
    result.branches[0].branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].branches[0].rawTx.should.equal(
      '010000000160ddcd2a591a36e1c8f350c499d86bd80d38fc26d44d98536fcd5cd039d07aed0100000000ffffffff020000000000000000226a20334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01aef6320000000000160014ea7348e6c85578e63dd08904f09893fb77e4309100000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v4 JSON file, parse as Hex string', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v4.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof.toString('hex'))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(0)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors[0].expected_value.should.equal(
      'e8886527b676a2d835e8fd8417b3884c0158ff7ec38647012fe15f5ae448d825'
    )
    should.not.exist(result.branches[0].branches[0].branches[0].branches)
    result.branches[0].branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].branches[0].opReturnValue.should.equal(
      '334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01'
    )
    result.branches[0].branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].branches[0].btcTxId.should.equal(
      '96bbb4b7c00b3e91810633bdccbca2c3e81da9b57ffde642853732e540b6f40c'
    )
    result.branches[0].branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].branches[0].rawTx.should.equal(
      '010000000160ddcd2a591a36e1c8f350c499d86bd80d38fc26d44d98536fcd5cd039d07aed0100000000ffffffff020000000000000000226a20334a18d706faf55e3f46ad4a8bae706a89c41f493ca5e2331c5a05c62d039a01aef6320000000000160014ea7348e6c85578e63dd08904f09893fb77e4309100000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v4 testnet JSON file, parse as Object', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v4-t.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parse(JSON.parse(jsonSample))
    console.log(JSON.stringify(result, null, 2))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(0)
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '58df97135d4ab912e484837398acbcbeb13236dee2cec8d9dea314c2b8f43cde'
    )
    done()
  })
})
