exports.getAction = function(url) {
  var idx = url.lastIndexOf('/')
  return url.substring(idx + 1)
}

exports.getUrl = function(url, pathVars) {
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

exports.getParamStr = function(params) {
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