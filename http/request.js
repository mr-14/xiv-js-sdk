const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { getUrl, getParamStr } = require('./url')

const DATA_TYPE_JSON = 'JSON'
const DATA_TYPE_FORM = 'FORM'

exports.get = (url, { headers = {}, pathVars = {}, params = {} }) => {
  return request(url, 'GET', { headers, pathVars, params })
}

exports.post = (url, { headers = {}, pathVars = {}, body = {} }) => {
  return request(url, 'POST', { headers, pathVars, body }, DATA_TYPE_JSON)
}

exports.formPost = (url, { headers = {}, pathVars = {}, body = {} }) => {
  return request(url, 'POST', { headers, pathVars, body }, DATA_TYPE_FORM)
}

exports.put = (url, { headers = {}, pathVars = {}, body = {} }) => {
  return request(url, 'UPDATE', { headers, pathVars, body }, DATA_TYPE_JSON)
}

exports.formPut = (url, { headers = {}, pathVars = {}, body = {} }) => {
  return request(url, 'UPDATE', { headers, pathVars, body }, DATA_TYPE_FORM)
}

exports.remove = (url, { headers = {}, pathVars = {} }) => {
  return request(url, 'DELETE', { headers, pathVars })
}

async function request(url, method, { headers = {}, pathVars = {}, params = {}, body }, dataType) {
  url = getUrl(url, pathVars) + getParamStr(params)
  headers = getHeaders(headers, dataType)

  console.log('API Request =', { url, method, headers, body, dataType })
  const resp = await getResponse(url, method, headers, body, dataType)
  console.log('API Response Status = ', resp.status)

  if (!resp.ok) {
    const error = await getJSON(resp)
    return { body: error, ok: false }
  }

  if (resp.status === 204) {
    return { body: null, ok: true }
  }

  const data = await getJSON(resp)
  return { body: data, ok: true }
}

function getHeaders(headers, dataType) {
  let contentType = 'application/json;charset=UTF-8'

  if (dataType === DATA_TYPE_FORM) {
    contentType = 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  return Object.assign(headers, { 'Content-Type': contentType })
}

async function getResponse(url, method, headers, body, dataType) {
  try {
    return await fetch(url, { method, headers, body: formatReqBody(body, dataType) })
  } catch (e) {
    console.error(e.message)
    return { body: { message: 'error.request.failed' }, ok: false }
  }
}

function formatReqBody(body, dataType) {
  if (!body) { return null }

  if (dataType === DATA_TYPE_JSON) {
    return JSON.stringify(body)
  }

  if (dataType === DATA_TYPE_FORM) {
    const params = new URLSearchParams()
    Object.keys(body).forEach(key => { params.append(key, body[key]) })
    return params
  }

  return body
}

async function getJSON(resp) {
  try {
    const json = await resp.json()
    console.log('API Response Body = ', json)
    return json
  } catch (e) {
    console.error('Error parsing JSON response.', e.message)
    return null
  }
}