exports.findSharedStart = function (strArray) {
  const arr = strArray.concat().sort()
  const s1 = arr[0]
  const s2 = arr[arr.length - 1]
  let i = 0

  while (i < s1.length && s1.charAt(i) === s2.charAt(i)) {
    i++
  }

  return s1.substring(0, i)
}
