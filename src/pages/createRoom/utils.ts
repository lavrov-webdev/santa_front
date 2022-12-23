// TO-DO поменять хардкод ip на переменную
const baseUrl = 'http://82.146.57.74'
export const createRoomLink = (roomId: string) => `${baseUrl}/room/${roomId}`
export const createEditRoomLink = (roomId: string) =>
  `${baseUrl}/room/${roomId}/edit`
