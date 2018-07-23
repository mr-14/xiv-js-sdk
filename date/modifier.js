exports.today = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

function addDate(date, units, interval) {
  let ret = new Date(date)
  const checkRollover = () => { if (ret.getDate() != date.getDate()) ret.setDate(0) }

  switch (interval.toLowerCase()) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + units)
      checkRollover()
      break
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * units)
      checkRollover()
      break
    case 'month':
      ret.setMonth(ret.getMonth() + units)
      checkRollover()
      break
    case 'week':
      ret.setDate(ret.getDate() + 7 * units)
      break
    case 'day':
      ret.setDate(ret.getDate() + units)
      break
    case 'hour':
      ret.setTime(ret.getTime() + units * 3600000)
      break
    case 'minute':
      ret.setTime(ret.getTime() + units * 60000)
      break
    case 'second':
      ret.setTime(ret.getTime() + units * 1000)
      break
    default:
      ret = undefined
  }

  return ret
}
exports.addDate = addDate

exports.getEndTime = (startDate, units, interval = 'day') => {
  let endTime = new Date(startDate)
  endTime = addDate(endTime, units, interval)
  endTime = addDate(endTime, -1, 'second')

  return endTime
}