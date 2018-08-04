exports.now = function () {
  return formatTimestamp(new Date())
}

exports.formatTimestamp= formatTimestamp
function formatTimestamp(date, delimiter = '-') {
  const hour = ('0' + date.getHours()).slice(-2)
  const minute =  ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)
  return `${formatDate(date, delimiter)} ${hour}:${minute}:${second}`
}

exports.formatDate = formatDate
function formatDate(date, delimiter = '-') {
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}${delimiter}${month}${delimiter}${day}`
}