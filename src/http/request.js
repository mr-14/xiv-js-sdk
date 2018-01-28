var urlutil = require('./url')

exports.get = function(url, { headers = {}, pathVars = {}, params = {} }) {
  return request(url, 'GET', { headers, pathVars, params })
}

exports.post = function(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'POST', { headers, pathVars, body })
}

exports.put = function(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'UPDATE', { headers, pathVars, body })
}

exports.remove = function(url, { headers = {}, pathVars = {} }) {
  return request(url, 'DELETE', { headers, pathVars })
}

async function request(url, method, { headers = {}, pathVars = {}, params = {}, body = {} }) {
  url = urlutil.getUrl(url, pathVars) + urlutil.getParamStr(params)
  var resp = await fetch(url, { method, headers, body })
  
  if (!resp.ok) {
    var error = await resp.json()
    return { body: error, ok: false }
  }

  if (resp.status === 204) {
    return { body: null, ok: true }
  }

  var data = await resp.json()
  return { body: data, ok: true }
}