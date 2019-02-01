const fs = require('fs')
const url = require('url')
const getHttpOrHttps = require('./util/request')

module.exports = function readFileFromWeb(fileURL, options, callback) {
  
  // fileURL can be string or URL object
  if(typeof fileURL === 'object') fileURL = fileURL.href 
  if (!fileURL) throw("Need a file url to download")

  // get encoding
  var encoding = null
  if(typeof options === 'string') encoding = options
  if(typeof options === 'object') encoding = options.encoding

  if(typeof options === 'function') callback = options
  if (typeof callback !== 'function') {
    throw("Need a callback")
  }

  if (url.parse(fileURL).protocol === null) {
    fileURL = 'http://' + fileURL
  }
  var request = getHttpOrHttps(fileURL)

  request.get(fileURL, function(res) {
    if (res.statusCode !== 200) {
      return callback(
        new Error(`can not get source: ${res.statusMessage}`))
    }

    var resultBuf = Buffer.alloc(0)
    res.on('data', (chunk) => {
      resultBuf = Buffer.concat([resultBuf,chunk])
    })
    res.on("end", function(){
      if(encoding){
        callback(null, resultBuf.toString(encoding))
      } else {
        callback(null, resultBuf)
      }
    })
  }).on('error', function(err) {
    if (callback) callback(err)
  })
}