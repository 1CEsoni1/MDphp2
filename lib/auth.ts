// Minimal auth helper that reads the current user from browser localStorage.
// This avoids depending on the removed `lib/storage.ts` mock and keeps
// existing callers (getCurrentUser / isAuthenticated / isAdmin / isTechnician)
// working after login which stores the user in localStorage under the key "user".

export type User = {
  id?: string
  user_id?: string
  name?: string
  username?: string
  type?: string
  type_id?: string
  typeId?: string
  [k: string]: any
}

const STORAGE_KEY = "user"

function readUser(): User | null {
  if (typeof window === "undefined") return null
  const s = localStorage.getItem(STORAGE_KEY)
  if (!s) return null
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

function writeUser(user: User | null) {
  if (typeof window === "undefined") return
  if (!user) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
}

export const auth = {
  // Legacy sync login helper: if a `users` array exists in localStorage we try to
  // validate credentials locally. The app's real login flow should call the
  // backend API (see `app/page.tsx`) which writes `localStorage.user` on success.
  login: (username: string, password: string): User | null => {
    if (typeof window === "undefined") return null
    const usersStr = localStorage.getItem("users")
    if (!usersStr) return null
    try {
      const users = JSON.parse(usersStr) as User[]
      const user = users.find((u) => u.username === username && (u as any).password === password)
      if (user) {
        writeUser(user)
        return user
      }
    } catch {
      return null
    }
    return null
  },

  logout: () => {
    writeUser(null)
  },

  getCurrentUser: (): User | null => {
    return readUser()
  },

  isAuthenticated: (): boolean => {
    return readUser() !== null
  },

  isAdmin: (): boolean => {
    const user = readUser()
    const t = (user as any)?.type || (user as any)?.type_id || (user as any)?.typeId
    return t === "admin" || t === "01"
  },

  isTechnician: (): boolean => {
    const user = readUser()
    const t = (user as any)?.type || (user as any)?.type_id || (user as any)?.typeId
    return t === "technician" || t === "02"
  },
}
