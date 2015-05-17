# local-uri
![](http://img.shields.io/badge/stability-stable-orange.svg?style=flat)
![](http://img.shields.io/npm/v/local-uri.svg?style=flat)
![](http://img.shields.io/npm/dm/local-uri.svg?style=flat)
![](http://img.shields.io/npm/l/local-uri.svg?style=flat)

Generates a local URI from a String or Typed Array, with fallbacks for older
browsers.

## Usage

[![NPM](https://nodei.co/npm/local-uri.png)](https://nodei.co/npm/local-uri/)

### `uri = createURI(data, type)`

`data` is a String or Typed Array (e.g. `Float32Array`), and will be the content
recieved when the `uri` is requested.

`type` is the mime type to use for the URI. Defaults to
`text/plain;charset=US-ASCII`.

``` javascript
var createURI = require('local-uri')
var xhr       = require('xhr')

var uri = createURI('hello world!')

xhr({ uri: uri }, function(err, res, body) {
  console.log(body) // "hello world!"
})
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/local-uri/blob/master/LICENSE.md) for details.
