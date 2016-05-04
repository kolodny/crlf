crlf
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Detect and change line endings

#### Usage

The cli is probably the one you're looking for, first `npm install -g crlf`.
Usage is something like this:

```bash
$ crlf index.js
index.js CRLF
$ crlf *.js
index.js CRLF
test.js LF
$ crlf --set=LF *.js
index.js CRLF -> LF
test.js LF -> LF
$ crlf index.js
LF
```

Here's the API usage

```js
var crlf = require('crlf');

crlf.get(__dirname + '/package.json', null, function(err, endingType) {
  console.log(endingType); // LF
});
crlf.set(__dirname + '/package.json', 'CRLF', function(err, endingType) {
  console.log(endingType); // LF
  // file was using LF and now uses CRLF
});
```


[npm-image]: https://img.shields.io/npm/v/crlf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/crlf
[travis-image]: https://img.shields.io/travis/kolodny/crlf.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/crlf
[coveralls-image]: https://img.shields.io/coveralls/kolodny/crlf.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/crlf
[downloads-image]: http://img.shields.io/npm/dm/crlf.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/crlf
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/kolodny/crlf?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
