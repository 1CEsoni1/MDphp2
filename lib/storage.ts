// Minimal localStorage-backed storage helper used by the demo app.
// Exposes a `storage` object and the `RepairRequest` type that pages import.

export interface User {
  id: string
  username: string
  password: string
  type: "admin" | "technician"
  name: string
}

export type RepairRequest = {
  id: string
  equipmentName?: string
  equipmentCode?: string
  location?: { building?: string; floor?: string | number; room?: string }
  description?: string
  priority?: "low" | "medium" | "high"
  reporter?: string
  status?: string
  reportDate?: string
  assignedTo?: string
  completedDate?: string
}

const STORAGE_KEY = 'requests'

const readRequests = (): RepairRequest[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as RepairRequest[]
  } catch (e) {
    return []
  }
}

const writeRequests = (arr: RepairRequest[]) => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)) } catch {}
}

export const storage = {
  getRequests(): RepairRequest[] {
    return readRequests()
  },
  addRequest(r: RepairRequest) {
    const cur = readRequests()
    cur.push(r)
    writeRequests(cur)
  },
  updateRequest(id: string, patch: Partial<RepairRequest>) {
    const cur = readRequests()
    const idx = cur.findIndex((x) => String(x.id) === String(id))
    if (idx === -1) return
    cur[idx] = { ...cur[idx], ...patch }
    writeRequests(cur)
  },
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  },
}
