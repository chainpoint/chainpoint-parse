/* global describe, it */

const should = require('should')
const chpParse = require('../index')
const fs = require('fs')

describe('Using a valid basic chainpoint v3 JSON file', function () {
  it('should return proof equal to original JSON', function (done) {
    fs.readFile('./test/data/proof2.chp.json', 'utf-8', function (err, jsonSample) {
      should.not.exist(err)
      should.exist(jsonSample)
      chpParse.parseObject(JSON.parse(jsonSample), function (err, result) {
        should.not.exist(err)
        result.branches.length.should.equal(1)
        result.branches[0].anchors.length.should.equal(1)
        should.not.exist(result.branches[0].branches)
        result.branches[0].anchors[0].expected_value.should.equal('51296468ea48ddbcc546abb85b935c73058fd8acdb0b953da6aa1ae966581a7a')
        done()
      })
    })
  })
})

describe('Using a valid larger chainpoint v3 JSON file', function () {
  it('should return proof equal to original JSON', function (done) {
    fs.readFile('./test/data/proof.chp.json', 'utf-8', function (err, jsonSample) {
      should.not.exist(err)
      should.exist(jsonSample)
      chpParse.parseObject(JSON.parse(jsonSample), function (err, result) {
        result.branches.length.should.equal(1)
        result.branches[0].anchors.length.should.equal(1)
        result.branches[0].branches.length.should.equal(2)
        result.branches[0].branches[0].anchors.length.should.equal(1)
        result.branches[0].branches[1].anchors.length.should.equal(1)
        should.not.exist(result.branches[0].branches[0].branches)
        should.not.exist(result.branches[0].branches[1].branches)
        should.not.exist(err)
        done()
      })
    })
  })
})

describe('Using a valid chainpoint v3 binary Base 64 file', function () {
  it('should return proof equal to original JSON', function (done) {
    fs.readFile('./test/data/proof.chp.b64', 'utf-8', function (err, b64Sample) {
      should.not.exist(err)
      should.exist(b64Sample)
      chpParse.parseBinary(b64Sample, function (err, result) {
        result.branches.length.should.equal(1)
        result.branches[0].anchors.length.should.equal(1)
        result.branches[0].branches.length.should.equal(2)
        result.branches[0].branches[0].anchors.length.should.equal(1)
        result.branches[0].branches[1].anchors.length.should.equal(1)
        should.not.exist(result.branches[0].branches[0].branches)
        should.not.exist(result.branches[0].branches[1].branches)
        should.not.exist(err)
        done()
      })
    })
  })
})
