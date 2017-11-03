var crypto = require('crypto')

exports.encode = function (payload, secret ) {
  const algorithm = 'HS256'

  var header = {
    typ: 'JWT',
    alg: algorithm
    }

    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload))
    return jwt + '.' + sign(jwt, secret)
}

exports.decode = function (token, key) {
  console.log(token)
  var segments = token.split('.')
  if(segments.length != 3)
    throw  new Error('Invalid token')

  var header = JSON.parse(base64Decode(segments[0]))
  var payload = JSON.parse(base64Decode(segments[1]))
  var rawSignature = segments[0] + '.' + segments[1]
  if(!verify(rawSignature, key,segments[2])) {
    throw new Error('Validation failed')
  }
  return payload
}

function sign(str, key) {
    return crypto.createHmac('sha256' , key).update(str).digest('base64')
}



function verify(raw, key, signature) {
  return signature === sign(raw, key)
}
function  base64Encode(str) {
  return new Buffer(str).toString('base64')
}

function base64Decode(str) {
  return new Buffer(str, 'base64').toString()
}
