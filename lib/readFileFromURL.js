var fs = require('fs')
var getHttpOrHttps = require('./util/request')

module.exports = function readFileFromURL(fileURL, callback) {
  if (!fileURL) throw("Need a file url to download")

  if (typeof callback !== 'function') {
    throw("Need a callback")
  }

  var request = getHttpOrHttps(fileURL)

  request.get(fileURL, function(res) {
    if (res.statusCode !== 200) {
      return callback(response.statusCode)
    }
    res.setEncoding('utf8')
    var result = ''
    res.on('data', (chunk) => {
      result += chunk
    })
    res.on("end", function(){
      callback(null, result)
    })
  }).on('error', function(err) {
    if (callback) callback(err)
  })
}