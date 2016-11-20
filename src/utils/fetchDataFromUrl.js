import fetch from 'node-fetch'

export default async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
  // TODO: Implement error handling !!
}
