const test = require('tape')
const xhr  = require('xhr')
const URI  = require('./')

;[true, false].forEach(function(remove) {
  var prefix = remove ? '[dataURI] ' : '[Blob] '

  test(prefix + 'Simple string', removeBlob(remove, function(t) {
    var uri = URI('hello world!')

    xhr({ uri: uri }, function(err, res, body) {
      t.ifError(err, 'requested successfully')
      t.equal(body, 'hello world!')
      t.end()
    })
  }))

  test(prefix + 'ArrayBuffer', removeBlob(remove, function(t) {
    var data1 = new Float32Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
    var uri   = URI(data1)

    xhr({
      uri: uri,
      responseType: 'arraybuffer'
    }, function(err, res, body) {
      t.ifError(err, 'requested successfully')

      var data2 = new Float32Array(body)
      t.deepEqual(data1, data2, 'data matches!')
      t.end()
    })
  }))

  test(prefix + 'UTF8', removeBlob(remove, function(t) {
    var data = '😁'
    var uri  = URI(data, 'text/plain;charset=utf-8')

    xhr({ uri: uri }, function(err, res, body) {
      t.ifError(err, 'requested successfully')

      t.equal(body, data, 'data matches!')
      t.end()
    })
  }))
})

function removeBlob(shouldRemove, tester) {
  if (!shouldRemove) return tester

  return function(t) {
    var createObjectURL = URL.createObjectURL
    URL.createObjectURL = false
    t.once('end', function() {
      URL.createObjectURL = createObjectURL
    })

    tester(t)
  }
}
