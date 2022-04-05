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
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
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
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
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
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v5 JSON file, parse as Object', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v5.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parse(JSON.parse(jsonSample))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v5 JSON file, parse as Buffer', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v5.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof)
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
    )
    done()
  })
})

describe('Using a valid chainpoint v5 JSON file, parse as Hex string', function() {
  it('should return expected results', function(done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v5.chp.json', 'utf-8')
    should.exist(jsonSample)
    let bufferProof = chpBinary.objectToBinarySync(JSON.parse(jsonSample))
    let result = chpParse.parse(bufferProof.toString('hex'))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '269b833efd1deaa80456cb50d13d311b81806519c00239de9671d8f1d47412dd'
    )
    should.not.exist(result.branches[0].branches[0].branches)
    result.branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].opReturnValue.should.equal(
      '06b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035'
    )
    result.branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].btcTxId.should.equal(
      'c61a2bf823bef8ce494ed7ea1f665c89e7df80a77b2af4f94d1cee8374c0a5d4'
    )
    result.branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].rawTx.should.equal(
      '01000000015836f22913868ac88a94d8f1b8d95b196cc21d2c945c19d4f10e06ffeaf4592c0100000000ffffffff020000000000000000226a2006b66405a1f40ffbea0c1a994e7002d6266ea0dc384758ec323b5209bfb49035f61ebd0100000000160014ce9846a388d8cb67a171e5991dfdbe7de7d2173b00000000'
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
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal(
      '8a3e47bc7bbf20e9d70611b26d38c7d6231aeaa93e9943f21d6a0727530d99be'
    )
    result.branches[0].branches[0].branches[0].should.have.property('opReturnValue')
    result.branches[0].branches[0].branches[0].opReturnValue.should.equal(
      '388ace3b25aa16f698fdb685a01ce980276811873c01d89ba0cb49878fbaf5be'
    )
    result.branches[0].branches[0].branches[0].should.have.property('btcTxId')
    result.branches[0].branches[0].branches[0].btcTxId.should.equal(
      '708dc002a03037b30ee3efb91c0dd8253466d6aeea54201e7a90f215c43eb23a'
    )
    result.branches[0].branches[0].branches[0].should.have.property('rawTx')
    result.branches[0].branches[0].branches[0].rawTx.should.equal(
      '010000000001017a5bc17f7ab6db7b2037d0b06fbbe709c83ca9fba751cf2c8e1747b4d34f30380000000000ffffffff020000000000000000226a20388ace3b25aa16f698fdb685a01ce980276811873c01d89ba0cb49878fbaf5beac02f2050000000016001406ca185708e58d09627f5cd5b88aa32c3f7c64580247304402200ba5d8c514f1697145afbab57290d4c2880a8665b8613f67cfc4c1cb6d6ae52302207e0a15af3de1901fb52275bb2b12ec19c718cd5aed5b2ddbfa7a0f740d3d3bbf012102afdb117ef0dc6e923e0083063e07799179844f2498290f33371bea2a41dd8ccb00000000'
    )
    done()
  })
})
