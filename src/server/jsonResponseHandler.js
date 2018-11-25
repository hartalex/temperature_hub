module.exports = function (response) {
  if (!response.ok || response.status != 200) {
    throw new Error('Bad response from server')
  }
  return response.json()
}
