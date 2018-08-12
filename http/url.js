exports.getUrl = (url, pathVars) => {
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

exports.getParamStr = (params) => {
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

exports.parseParamStr = (query) => {
  const result = {}
  query.split('&').forEach(part => {
    const item = part.split('=')
    result[item[0]] = decodeURIComponent(item[1])
  })
  return result
}