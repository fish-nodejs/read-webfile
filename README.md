# downloadFile

## df.readFileFromURL(path[, options], callback)
basicly, this function is design to follow native function API of [fs.readFile](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback). 

- path `<string>` | `<URL>` required
  - can be a string such as https://nodejs.org
  - can be a URL object such as `new URL('https://nodejs.org')`
  - is required, only support http or https portocol

- options <Object> | <string>
  - can be a string which represent encoding such as 'utf8'
  - can be object such as `{encoding: 'utf8'}`

- callback <Function>
  - err <Error>
  - data <string> | <Buffer>

```
npm i web-file --save
```
``` js
const wf = require('web-file')

var url = 'https://nodejs.org'

wf.readFileFromURL(url, 'utf8', (err, data) => {
  if(err) console.error(err)
  console.log(data)
})
```


