# read-webfile

## wf.readFileFromWeb(path[, options], callback)
basicly, this function is design to follow native API of [fs.readFile](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback). 

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

wf.readFileFromWeb(url, 'utf8', (err, data) => {
  if(err) console.error(err)
  console.log(data)
})
```

## todo

## bug
1. createReadStream 传入 `https://nodejs.prg/en/` 后
为什么onend 之后还触发了 ondata
具体的内容就是HTML头部哪些内容
2. isEnd 还是false ...
3. 独立的https请求合格网址还是正常的

```
node test.js
```
```
--- 
false
html 内容
end--
```

```
node test1.js
---
false
chunk...
res1.ondata

....

end --
false
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="utf-8">
  <title>Node.js</title>

  <link r
  ...
ERROR: stream.push() after EOF
```

bug 分析，在res.onend之后，莫名其妙的触发了一次ondata 事件，内容是这个文件的一开始的一些内容，而且isEnd 还是false