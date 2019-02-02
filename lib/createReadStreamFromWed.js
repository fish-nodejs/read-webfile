const fs = require('fs')
const stream = require('stream')
const url = require('url')
const getHttpOrHttps = require('./util/getHttpOrHttps')

module.exports = function readFileFromWeb(fileURL, options) {
  
  // fileURL can be string or URL object
  if(typeof fileURL === 'object') fileURL = fileURL.href 
  if (!fileURL) throw("Need a file url to download")

  // get encoding
  var encoding = null
  if(typeof options === 'string') encoding = options
  if(typeof options === 'object') encoding = options.encoding

  if (url.parse(fileURL).protocol === null) {
    fileURL = 'http://' + fileURL
  }
  var request = getHttpOrHttps(fileURL)

  const rs = new stream.Readable()
  rs._read = function() {
    request.get(fileURL, function(res) {
      if (res.statusCode !== 200) {
        throw new Error(`can not get source: ${res.statusMessage}`)
      }
      var isEnd = false
      res.on('data', (chunk) => {
        console.warn('---')
        console.log(isEnd)
        if(isEnd) {
          console.log(chunk.toString('utf8'))
        }
        console.log(chunk.toString('utf8'))
        if (!chunk) {
          console.warn('|||||')
        }
        if(encoding) {
          rs.push(chunk.toString(encoding))
        } else {
          rs.push(chunk)
        }
      })
      res.on("end", function(){
        rs.push(null)
        isEnd = true
        console.log('end--')
      })
    }).on('error', function(err) {
      throw err
    })
  }
  return rs
}