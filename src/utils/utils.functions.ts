import { encode } from 'bs58'
import { SHA256 } from 'crypto-js'

export function capitalizeWords(str: string) {
  if (str.includes('_')) {
    const words = str.split('_')

    const capitalizedWords = words.map(word => {
      const trimmedWord = word.trim()
      const firstChar = trimmedWord.charAt(0).toUpperCase()
      const restOfString = trimmedWord.slice(1).toLowerCase()
      return firstChar + restOfString
    })

    return capitalizedWords.join(' ')
  }

  const trimmedWord = str.trim()
  const firstChar = trimmedWord.charAt(0).toUpperCase()
  const restOfString = trimmedWord.slice(1).toLowerCase()

  return firstChar + restOfString
}

export function isUrl(value: string) {
  const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+(?:\/.*)?$/
  return urlPattern.test(value)
}

export function convertTxStatus(status: number) {
  switch (status) {
    case 0:
      return
  }
}

export function isJSONObject(value: string) {
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp)

  // Extract the individual components of the date
  const month = date.getMonth() + 1 // Months are zero-based, so add 1
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Format the components into the desired format
  const formattedTimestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`

  return formattedTimestamp
}

function hexToUint8Array(hexString: String): Uint8Array {
  if (hexString.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  const arrayBuffer = new Uint8Array(hexString.length / 2)

  for (let i = 0; i < hexString.length; i += 2) {
    const byteValue = parseInt(hexString.substr(i, 2), 16)
    arrayBuffer[i / 2] = byteValue
  }

  return arrayBuffer
}
export function formatDataKey(chain_id: String, address: String, token_id: String) {
  const input = `${chain_id}${address}${token_id}`
  const sha256Hash = SHA256(input).toString()
  const uint8Array = hexToUint8Array(sha256Hash)
  return encode(uint8Array)
}

export function updateURL(newPath: string) {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)

  url.pathname = newPath
  const newUrl = url.href

  window.history.pushState({ path: newUrl }, '', newUrl)
}
