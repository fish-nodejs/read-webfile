const url = require('url')

var link = 'https://nodejs.org/dist/latest-v10.x/docs/api/fs.html'

var linkObj = url.parse(link)
console.log(linkObj)
/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'nodejs.org',
  port: null,
  hostname: 'nodejs.org',
  hash: null,
  search: null,
  query: null,
  pathname: '/dist/latest-v10.x/docs/api/fs.html',
  path: '/dist/latest-v10.x/docs/api/fs.html',
  href: 'https://nodejs.org/dist/latest-v10.x/docs/api/fs.html' }
  */