export const isValidUrl = (str) => {
  try {
    const url = new URL(str)
    return ["http:", "https:"].includes(url.protocol)
  } catch {
    return false
  }
}
