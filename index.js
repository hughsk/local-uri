var isTypedArray = require('is-typedarray')

module.exports = LocalURI

function LocalURI(content, type) {
  type = type || 'text/plain;charset=US-ASCII'

  if (typeof URL !== 'undefined' && URL.createObjectURL) {
    content = Array.isArray(content) ? content : [content]

    return URL.createObjectURL(new Blob(content, {
      type: type
    }))
  }

  if (isTypedArray(content)) {
    var uint8 = new Uint8Array(content.buffer)

    content = ''
    for (var i = 0; i < uint8.length; i++) {
      content += String.fromCharCode(uint8[i])
    }
  }

  try {
    var base64 = btoa(content)
    var prefix = 'data:' + type + ';base64,'

    return prefix + base64
  } catch(e) {
    var encode = encodeURIComponent(content)
    var prefix = 'data:' + type + ','

    return prefix + encode
  }
}
