export function fetchJsonResponseHandler(response) {
  if (!response.ok && response.status !== 200) {
    throw new Error('API returned error code: ' + response.status)
  }
  return response.json()
}
