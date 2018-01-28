export function getAction(url) {
  var idx = url.lastIndexOf('/')
  return url.substring(idx + 1)
}

export function getUrl(url, pathVars) {
  if (!pathVars) {
    return url
  }

  for (var key in pathVars) {
    if (pathVars.hasOwnProperty(key)) {
      url = url.replace('{' + key + '}', pathVars[key])
    }
  }

  return url
}

export function getParamStr(params) {
  if (!params) {
    return ''
  }

  var queries = ''
  var delim = '?'

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      queries += delim + key + '=' + JSON.stringify(params[key])
      delim = '&'
    }
  }

  return encodeURI(queries)
}