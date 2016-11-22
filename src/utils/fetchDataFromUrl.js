import fetch from 'node-fetch'

export default async (url, options) => {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
  // TODO: Implement error handling !!
}
