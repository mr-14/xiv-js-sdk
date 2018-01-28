function getAction(url) {
  const idx = url.lastIndexOf('/')
  return url.substring(idx + 1)
}

function getUrl(url, pathVars) {
  if (!pathVars) {
    return url
  }

  for (const key of Object.keys(pathVars)) {
    const val = pathVars[key]
    url = url.replace('{' + key + '}', val)
  }

  return url
}

function getParamStr(params) {
  if (!params) {
    return ''
  }

  let queries = ''
  let delim = '?'

  for (const key of Object.keys(params)) {
    queries += delim + key + '=' + JSON.stringify(params[key])
    delim = '&'
  }

  return encodeURI(queries)
}

module.exports = {
  getAction,
  getUrl,
  getParamStr,
}