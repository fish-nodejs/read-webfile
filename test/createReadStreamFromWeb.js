const assert = require('assert')
const createReadStreamFromWeb = require('../lib').createReadStreamFromWeb
const url = require('url');

var noProtocolUrl = 'music.bitfish.xyz/'
var httpUrl = 'http://music.bitfish.xyz/'
var httpsUrl = 'https://nodejs.org/en/'
var redirectURL = 'https://nodejs.org/'

describe('createReadStreamFromWeb', () => {
  // this.timeout(5000);
  describe('one arg (url)', () => {
    describe('url is a string', () => {
      it(`should fetch http protocol url such as ${httpUrl}`, (done) => {
        const rs = createReadStreamFromWeb(httpUrl)
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
          done()
        })
      })
      it(`should fetch https protocol url such as ${httpsUrl}`, (done) => {
        const rs = createReadStreamFromWeb(httpsUrl)
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
          done()
        })
      })
      it(`should take ${noProtocolUrl} as http protocol`, (done) => {
        const rs = createReadStreamFromWeb(noProtocolUrl)
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
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
        const rs = createReadStreamFromWeb(httpUrlObj)
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
          done()
        })
      })
    })
  })
  describe('twe args (url, options)', () => {
    describe('options is a string', () => {
      it(`should take this string as encoding such as 'utf8'`, (done) => {
        const rs = createReadStreamFromWeb(httpUrl, 'utf8')
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
          done()
        })
      })
    })
    describe('options is an object', () => {
      it(`should read encoding from obj.encoding`, (done) => {
        const rs = createReadStreamFromWeb(httpUrl, {encoding: 'utf8'})
        rs.on('data', chunk => {
          assert(Buffer.isBuffer(chunk))
        })
        rs.on('end', () => {
          done()
        })
      })
    })
  })
})