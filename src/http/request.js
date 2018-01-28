import { getUrl, getParamStr } from './url'

export function get(url, { headers = {}, pathVars = {}, params = {} }) {
  return request(url, 'GET', { headers, pathVars, params })
}

export function post(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'POST', { headers, pathVars, body })
}

export function put(url, { headers = {}, pathVars = {}, body = {} }) {
  return request(url, 'UPDATE', { headers, pathVars, body })
}

export function remove(url, { headers = {}, pathVars = {} }) {
  return request(url, 'DELETE', { headers, pathVars })
}

async function request(url, method, { headers = {}, pathVars = {}, params = {}, body = {} }) {
  url = getUrl(url, pathVars) + getParamStr(params)
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