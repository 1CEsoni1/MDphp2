import { storage, type User } from "./storage"

export const auth = {
  login: (username: string, password: string): User | null => {
    const users = storage.getUsers()
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      storage.setCurrentUser(user)
      return user
    }
    return null
  },

  logout: () => {
    storage.setCurrentUser(null)
  },

  getCurrentUser: (): User | null => {
    return storage.getCurrentUser()
  },

  isAuthenticated: (): boolean => {
    return storage.getCurrentUser() !== null
  },

  isAdmin: (): boolean => {
  const user = storage.getCurrentUser()
  // Accept either legacy `type` or API `type_id` (e.g. '01')
  const t = (user as any)?.type || (user as any)?.type_id || (user as any)?.typeId
  return t === "admin" || t === "01"
  },

  isTechnician: (): boolean => {
  const user = storage.getCurrentUser()
  // Accept either legacy `type` or API `type_id` (e.g. '02')
  const t = (user as any)?.type || (user as any)?.type_id || (user as any)?.typeId
  return t === "technician" || t === "02"
  },
}
