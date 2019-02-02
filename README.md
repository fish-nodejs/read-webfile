# read-webfile
read a file from a url just like from a file path! 

## Installation
```
npm i web-file --save
```
## wf.readFileFromWeb(path[, options], callback)
basicly, this function is design to follow native API of [fs.readFile](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback). 

- path `<string>` | `<URL>` required
  - can be a string such as `https://nodejs.org`
  - can be a URL object such as `new URL('https://nodejs.org')`
  - is required, and only support http or https portocol

- options `<Object>` | `<string>`
  - can be a string which represent encoding such as 'utf8'
  - can be object such as `{encoding: 'utf8'}`

- callback `<Function>`
  - err `<Error>`
  - data `<string>` | `<Buffer>`

``` js
const wf = require('read-webfile')
let url = 'https://nodejs.org/en/'

wf.readFileFromWeb(url, 'utf8', (err, data) => {
  if(err) console.error(err)
  console.log(data)
})
```

## wf.createReadStream(path[, options])
basicly, this function is design to follow native API of [fs.createReadStream](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_createreadstream_path_options).

- path `<string>` | `<URL>`
- options `<string>` | `<Object>`
  - encoding `<string>` Default: null
- Returns: a Readable Stream.

``` js
const wf = require('read-webfile')
let url = 'https://nodejs.org/en/'

const rs = wf.createReadStreamFromWeb(url)
rs.on('data', chunk => {
  console.log(chunk.toString('utf8'))
})
rs1.on('end', () => {
  console.log('onend')
})
```
## notice
this function can not handler redirect such a http 304 code.