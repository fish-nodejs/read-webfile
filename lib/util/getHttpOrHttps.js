var url = require('url')
var http = require('http')
var https = require('https')

module.exports = function getHttpOrHttps(urlLink) {
  switch(url.parse(urlLink).protocol){
    case 'http:':
      return http
    case 'https:':
      return https
    default:
      throw new Error('Do not support this protocol')
  }
}