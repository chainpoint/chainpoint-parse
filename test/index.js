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
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(0)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].branches[0].anchors[0].expected_value.should.equal(
      '107abc9f53d1f00c79ecf58e4446a0d2711b4543bb07ea0176431b175fe07889'
    )
    should.not.exist(result.branches[0].branches[0].branches[0].branches)
    result.branches[0].branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].branches[0].opReturnValue.should.equal(
      '6678c4184c7f99bc493df567cc261925cf00ddd5b179bd078e03f6cbbeaa4313'
    )
    result.branches[0].branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].branches[0].btcTxId.should.equal(
      '9f0eea5a2cf55429e82b841ccf6492f4507c0c57d5bf1242af4495b802bf699c'
    )
    result.branches[0].branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].branches[0].rawTx.should.equal(
      '010000000189addd588d8c44513de1aef196e9e6057746851e112c732356f999438be084470000000000ffffffff020000000000000000226a206678c4184c7f99bc493df567cc261925cf00ddd5b179bd078e03f6cbbeaa43130a132900000000001600144325c03453c822703070f36c4aa3a32678f9cf4e00000000'
    )
    done()
  })
})
