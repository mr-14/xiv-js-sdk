const urlutil = require('./url')

function get(url, { headers = {}, pathVars = {}, params = {} }) {
  return request(url, 'GET', { headers, pathVars, params })
}

function post(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'POST', { headers, pathVars, body })
}

function put(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'UPDATE', { headers, pathVars, body })
}

function remove(url, { headers = {}, pathVars = {} }) {
  return request(url, 'DELETE', { headers, pathVars })
}

async function request(url, method, { headers = {}, pathVars = {}, params = {}, body = {} }) {
  url = urlutil.getUrl(url, pathVars) + urlutil.getParamStr(params)
  const resp = await fetch(url, { method, headers, body })
  
  if (!resp.ok) {
    const error = await resp.json()
    return { body: error, ok: false }
  }

  if (resp.status === 204) {
    return { body: null, ok: true }
  }

  const data = await resp.json()
  return { body: data, ok: true }
}

module.exports = {
  get,
  post,
  put,
  remove,
}