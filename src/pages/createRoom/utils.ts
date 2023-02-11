const BASE_URL = `${window.location.protocol}//${window.location.hostname}`
export const createRoomLink = (roomId: string) => `${BASE_URL}/room/${roomId}`
export const createEditRoomLink = (roomId: string, roomPassword: string) =>
  `${BASE_URL}/room/${roomId}/edit?password=${roomPassword}`
