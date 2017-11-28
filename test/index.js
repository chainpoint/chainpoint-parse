/* global describe, it */

const should = require('should')
const chpParse = require('../index')
const fs = require('fs')

describe('Using a valid chainpoint v3 JSON file', function () {
  it('should return proof equal to original JSON', function (done) {
    let jsonSample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.json', 'utf-8')
    should.exist(jsonSample)
    let result = chpParse.parseObject(JSON.parse(jsonSample))
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal('6ca04599f53305103a87f087147e7d4b5748e584491e2aea150fffe5b2e75bcb')
    should.not.exist(result.branches[0].branches[0].branches)
    done()
  })
})

describe('Using a valid chainpoint v3 binary Base 64 file', function () {
  it('should return proof equal to original JSON', function (done) {
    let b64Sample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.b64', 'utf-8')
    should.exist(b64Sample)
    let result = chpParse.parseBinary(b64Sample)
    result.branches.length.should.equal(1)
    result.branches[0].anchors.length.should.equal(1)
    result.branches[0].branches.length.should.equal(1)
    result.branches[0].branches[0].anchors.length.should.equal(1)
    result.branches[0].branches[0].anchors[0].expected_value.should.equal('6ca04599f53305103a87f087147e7d4b5748e584491e2aea150fffe5b2e75bcb')
    should.not.exist(result.branches[0].branches[0].branches)
    done()
  })
})
