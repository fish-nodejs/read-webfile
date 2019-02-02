const assert = require('assert')
const readFileFromWeb = require('../lib').readFileFromWeb
const url = require('url');

var noProtocolUrl = 'music.bitfish.xyz/'
var httpUrl = 'http://music.bitfish.xyz/'
var httpsUrl = 'https://nodejs.org/en/'
var redirectURL = 'https://nodejs.org/'

describe('readFileFromWeb', () => {
  // this.timeout(5000);
  describe('two args (url, callback)', () => {
    describe('url is a string', () => {
      it(`should fetch http protocol url such as ${httpUrl}`, (done) => {
        readFileFromWeb(httpUrl, (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(Buffer.isBuffer(data), 
            true, 'should return Buffer')
          done()
        })
      })
      it(`should fetch https protocol url such as ${httpsUrl}`, (done) => {
        readFileFromWeb(httpsUrl, (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(Buffer.isBuffer(data), 
            true, 'should return Buffer')
          done()
        })
      })
      it(`should take ${noProtocolUrl} as http protocol`, (done) => {
        readFileFromWeb(noProtocolUrl, (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(Buffer.isBuffer(data), 
            true, 'should return Buffer')
          done()
        })
      })
      it(`should redirect when http code is 3XX`, (done) => {
          done()
      })
    })
    describe('url is an URL object', () => {
      it(`should support url is an URL object`, (done) => {
        var httpUrlObj = url.parse(httpUrl)
        readFileFromWeb(httpUrlObj, (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(Buffer.isBuffer(data), 
            true, 'should return Buffer')
          done()
        })
      })
    })
  })
  describe('three args (url, options, callback)', () => {
    describe('options is a string', () => {
      it(`should take this string as encoding such as 'utf8'`, (done) => {
        readFileFromWeb(httpsUrl, 'utf8', (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(typeof data, 
            'string', 'should return Buffer')
          done()
        })
      })
    })
    describe('options is an object', () => {
      it(`should read encoding from obj.encoding`, (done) => {
        readFileFromWeb(httpsUrl, {encoding: 'utf8'}, (err, data) => {
          assert.equal(err, null, 
            'should not have error')
          assert.equal(typeof data, 
            'string', 'should return string')
          done()
        })
      })
    })
  })
})