const randomIds = new Set([])

function generateRandomId(): string {
  const chars = 'qwertyuiopasdfghjklzxcvbnm1234567890'
  let newRandomId = ''

  while (newRandomId.length < 10) {
    newRandomId += chars.charAt(Math.round(Math.random() * chars.length))
  }

  if (randomIds.has(newRandomId)) {
    return generateRandomId()
  }

  return newRandomId
}

export default generateRandomId