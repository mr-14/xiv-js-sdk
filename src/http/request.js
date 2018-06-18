import fetch from 'node-fetch'
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
  headers = Object.assign(headers, { 'Content-Type': 'application/json;charset=UTF-8' })

  console.log('API Request =', { url, method, headers, body })
  const resp = await getResponse(url, method, headers, body)
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

async function getResponse(url, method, headers, body) {
  try {
    return await fetch(url, { method, headers, body: JSON.stringify(body) })
  } catch (e) {
    console.error(e.message)
    return { body: { message: 'error.request.failed' }, ok: false }
  }
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