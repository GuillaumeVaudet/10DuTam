// Dans ~/utils/selectRandomId.js
export function selectRandomId(ids: { id: string }[]) {
  if (ids.length === 0) return null
  const randomIndex = Math.floor(Math.random() * ids.length)
  return ids[randomIndex].id
}
