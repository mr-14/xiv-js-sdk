'use strict'

const alphaBytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numericBytes = '0123456789'
const alphaNumericBytes = alphaBytes + numericBytes

function randomAlphaNumeric(len) {
  let val = ''
  for (let i = 0; i < len; i++) {
    val += alphaNumericBytes.charAt(randomInt(alphaNumericBytes.length - 1))
  }
  return val
}

function randomAlpha(len) {
  let val = ''
  for (let i = 0; i < len; i++) {
    val += alphaBytes.charAt(randomInt(alphaBytes.length - 1))
  }
  return val
}

function randomNumeric(len) {
  let val = ''
  for (let i = 0; i < len; i++) {
    val += numericBytes.charAt(randomInt(numericBytes.length - 1))
  }
  return val
}

function randomInt(max) {
  return randomIntFromInterval(0, max)
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  randomAlphaNumeric,
  randomAlpha,
  randomNumeric,
  randomInt,
  randomIntFromInterval
}
