const df = require('./lib')

var url = 'https://nodejs.org/dist/latest-v10.x/docs/api/fs.html'

df.readFileFromURL(url, 'utf8', (err, data) => {
  if(err) console.error(err)
  console.log(data)
})