const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

exports.createAccessToken = (claim, tokenKey) => {
  claim.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 hours
  return jwt.sign(claim, tokenKey)
}

exports.createRefreshToken = () => ({
  token: uuidv4(),
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8) // 8 hours
})

exports.validateToken = (tokenKey, token) => {
  if (!tokenKey) {
    throw new Error('error.token.keyMissing')
  }

  try {
    return jwt.verify(token, tokenKey)
  } catch (e) {
    throw new Error('error.token.invalid')
  }
}

exports.decodeToken = token => {
  if (!token) {
    throw new Error('error.token.missing')
  }

  try {
    return jwt.decode(token)
  } catch (e) {
    throw new Error('error.token.invalid')
  }
}