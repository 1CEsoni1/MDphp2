"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Monitor, Snowflake, Wifi, Wrench, Zap, Camera } from "lucide-react"
import { auth } from "@/lib/auth"

interface Equipment {
  id: string
  name: string
  code: string
  type: "computer" | "ac" | "router"
  status: "working" | "repair" | "maintenance"
  position: { x: number; y: number }
  tableNumber: number
  side: "left" | "right"
  row: number
  seat: number
  room: string
  needsRepair?: boolean
  repairDescription?: string
}

interface EquipmentDialogProps {
  equipment: Equipment | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (equipmentId: string, newStatus: "working" | "repair" | "maintenance") => void
  isTargetEquipment?: boolean
  taskStatus?: string
  canUpdate?: boolean
  taskId?: string | null
  assignedTo?: string | null
  onSaved?: () => void
}

export function EquipmentDialog({
  equipment,
  isOpen,
  onClose,
  onStatusUpdate,
  isTargetEquipment = false,
  taskStatus,
  canUpdate = false,
  taskId,
  assignedTo,
  onSaved,
}: EquipmentDialogProps) {
  if (!equipment) return null

  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [saving, setSaving] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("in-progress")
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case "computer":
        return <Monitor className="w-5 h-5" />
      case "ac":
        return <Snowflake className="w-5 h-5" />
      case "router":
        return <Wifi className="w-5 h-5" />
      default:
        return <Wrench className="w-5 h-5" />
    }
  }

  async function fileToBase64(file: File) {
    return await new Promise<{ name: string; data: string }>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base = result.split(',')[1]
        resolve({ name: file.name, data: base })
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function submitReport(taskId: string, notes: string, files: File[], status: string) {
    try {
      const user = auth.getCurrentUser()
      const changedBy = user?.user_id || user?.userId || user?.id || user?.name || null
      const assignedToVal = user?.user_id || user?.userId || user?.id || null
      const payload: any = { notes, status, changedBy }
      let res
      try {
        if (files && files.length > 0) {
          // send as multipart/form-data
          const fd = new FormData()
          fd.append('notes', notes || '')
          fd.append('status', status)
          if (assignedToVal) fd.append('assignedTo', String(assignedToVal))
          if (changedBy) fd.append('changedBy', String(changedBy))
          files.forEach((f) => fd.append('files', f))

          res = await fetch(`/api/repair-requests/${encodeURIComponent(String(taskId))}`, {
            method: 'PATCH',
            body: fd,
          })
        } else {
          if (assignedToVal) payload.assignedTo = assignedToVal
          res = await fetch(`/api/repair-requests/${encodeURIComponent(String(taskId))}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        }
      } catch (networkErr) {
        console.error('[EquipmentDialog] network error', networkErr)
        alert('ไม่สามารถเชื่อมต่อไปยังเซิร์ฟเวอร์ได้')
        return false
      }

      let body: any = null
      try {
        body = await res.json().catch(() => null)
      } catch (e) {
        body = null
      }

      if (res.ok) {
        // close and reset
        setEditing(false)
        setNotes('')
        setSelectedFiles([])
        onClose()
        if (typeof onSaved === 'function') onSaved()
        alert('บันทึกรายงานสำเร็จ')
        try {
          // navigate back to technician dashboard
          router.push('/technician/dashboard')
        } catch (e) {
          // fallback to full navigation
          window.location.href = '/technician/dashboard'
        }
        return true
      }

      console.error('[EquipmentDialog] server responded with error', res.status, body)
      const msg = (body && (body.error || body.message)) ? (body.error || body.message) : `Server error ${res.status}`
      alert('ไม่สามารถบันทึกรายงาน: ' + msg)
      return false
    } catch (e) {
      console.error('[EquipmentDialog] unexpected error', e)
      alert('เกิดข้อผิดพลาดไม่คาดคิด')
      return false
    }
  }

  // When dialog opens for a task that is already assigned to someone (a claimed job),
  // show the report/editor UI immediately so the technician can attach evidence and update status.
  // Only force this when this dialog is for the target equipment and the user can update.
  // We don't change behavior for unassigned tasks here.
  useEffect(() => {
    if (isOpen && assignedTo && isTargetEquipment && canUpdate) {
      setEditing(true)
    }
    // If the taskStatus prop exists, default the selectedStatus to it when opening
    if (isOpen && taskStatus) {
      setSelectedStatus(taskStatus === 'completed' ? 'completed' : 'in-progress')
    }
  }, [isOpen, assignedTo, isTargetEquipment, canUpdate, taskStatus])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
        return <Badge className="bg-green-100 text-green-800">ใช้งานได้</Badge>
      case "repair":
        return <Badge className="bg-red-100 text-red-800">ต้องซ่อม</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">บำรุงรักษา</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const getEquipmentTypeName = (type: string) => {
    switch (type) {
      case "computer":
        return "คอมพิวเตอร์"
      case "ac":
        return "เครื่องปรับอากาศ"
      case "router":
        return "Router"
      default:
        return "ครุภัณฑ์"
    }
  }

  const getTablePosition = (equipment: Equipment) => {
    const table = equipment.tableNumber && equipment.tableNumber > 0 ? `โต๊ะที่ ${equipment.tableNumber}` : "อุปกรณ์พิเศษ/ไม่ระบุ"
    const side = equipment.side ? (equipment.side === "left" ? "ซ้าย" : "ขวา") : "ไม่ระบุ"
    const row = equipment.row && equipment.row > 0 ? equipment.row : "-"
    const seat = equipment.seat && equipment.seat > 0 ? equipment.seat : "-"
    if (!equipment.tableNumber || equipment.tableNumber === 0) return table
    return `${table} (ฝั่ง${side} แถว ${row} ที่นั่ง ${seat})`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="mx-4 sm:mx-auto max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getEquipmentIcon(equipment.type)}
            รายละเอียดครุภัณฑ์
            {isTargetEquipment && canUpdate && (
              <Badge variant="destructive" className="ml-2">
                🎯 เป้าหมาย
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>ข้อมูลและสถานะของครุภัณฑ์</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full">
          <div className="overflow-auto space-y-3 p-3 pb-28 max-h-[60vh]">
          {/* Equipment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">ชื่อครุภัณฑ์</label>
              <p className="text-sm font-semibold">{equipment.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">รหัส</label>
              <p className="text-sm font-semibold">{equipment.code}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">ประเภท</label>
              <p className="text-sm">{getEquipmentTypeName(equipment.type)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">ห้อง</label>
              <p className="text-sm">{equipment.room}</p>
            </div>
          </div>

          {/* Table Position */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <label className="text-sm font-medium text-blue-800">ตำแหน่งโต๊ะ</label>
            <p className="text-sm font-semibold text-blue-700">{getTablePosition(equipment)}</p>
            {equipment.tableNumber > 0 && (
              <div className="mt-2 text-xs text-blue-600">
                <div>• ฝั่ง: {equipment.side === "left" ? "ซ้าย" : "ขวา"}</div>
                <div>• แถวที่: {equipment.row}</div>
                <div>• ที่นั่งที่: {equipment.seat}</div>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">สถานะปัจจุบัน</label>
            <div className="flex items-center gap-2">{getStatusBadge(equipment.status)}</div>
          </div>

          {/* Repair Description */}
          {equipment.repairDescription && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <label className="text-sm font-medium text-red-800">รายละเอียดปัญหา</label>
              <p className="text-sm text-red-700 mt-1">{equipment.repairDescription}</p>
            </div>
          )}

          {/* Status Update (only for authorized users) */}
          {isTargetEquipment && (taskStatus as any) !== 'completed' && canUpdate && (
            <div className="pt-4 border-t">
              <label className="text-sm font-medium mb-2 block">อัปเดตสถานะ</label>
              <div className="flex gap-2 flex-wrap">
                {/* If already assigned, we do not show Start/Complete buttons here - editor opens directly */}
                {/* Quick action buttons removed as per UX request */}
              </div>
            </div>
          )}

          {/* Editing / report UI */}
          {isTargetEquipment && canUpdate && editing && (
            <div className="pt-4 border-t space-y-3">
              <label className="text-sm font-medium text-gray-700 block">รายละเอียดการส่งงาน</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded p-2 min-h-[60px]" placeholder="รายละเอียดการส่งงาน..." />
              <div className="flex items-center gap-2">
                <label className="text-sm">สถานะรายงาน</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border rounded px-2 py-1">
                  <option value="in-progress">กำลังซ่อม</option>
                  <option value="completed">ซ่อมเสร็จ</option>
                </select>
              </div>
              <div
                className="rounded-xl border-2 border-dashed border-gray-300 bg-white/50 p-6 flex flex-col items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const files = Array.from(e.dataTransfer?.files || [])
                  const images = files.filter(f => f.type.startsWith('image/'))
                  if (images.length) {
                    setSelectedFiles((prev) => {
                      const merged = [...prev, ...images]
                      setUploadMessage(`${merged.length} ไฟล์ที่เลือก`)
                      return merged
                    })
                    setFileError(null)
                  } else {
                    setFileError('ไม่มีไฟล์ภาพที่ถูกเลือก')
                  }
                }}
              >
                <div className="text-gray-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l5-5 5 5M12 11v10" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-4">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง</p>
                <input ref={fileInputRef} id={`file-${equipment.id}`} type="file" multiple accept="image/*" className="hidden" onClick={(e:any) => { e.target.value = null }} onChange={(e) => {
                  const files = Array.from(e.target.files || []).filter((f:any) => f.type.startsWith('image/'))
                  if (files.length) {
                    setSelectedFiles((prev) => {
                      const merged = [...prev, ...files]
                      setUploadMessage(`${merged.length} ไฟล์ที่เลือก`)
                      return merged
                    })
                    setFileError(null)
                  } else {
                    setFileError('ไม่มีไฟล์ภาพที่ถูกเลือก')
                  }
                }} />
                <Button variant="ghost" className="bg-white shadow hover:bg-gray-50 flex items-center gap-2" onClick={() => fileInputRef.current?.click()}>
                  <Camera className="w-4 h-4" />
                  เลือกไฟล์
                </Button>
              </div>
                {selectedFiles.length > 0 && (
                  <div>
                    <div className="mt-3 grid grid-cols-6 gap-2">
                  {selectedFiles.map((f, i) => (
                    <div key={i} className="w-full h-20 overflow-hidden rounded border relative">
                      <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                      <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow text-xs" onClick={() => setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i))}>✕</button>
                    </div>
                  ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{uploadMessage}</div>
                  </div>
                )}
                {fileError && <div className="text-sm text-red-600 mt-2">{fileError}</div>}
              <div className="text-sm text-gray-500">กดปุ่ม "บันทึก" ด้านล่างเพื่อส่งรายงาน</div>
            </div>
          )}

          </div>
          {/* Footer pinned to bottom of dialog */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t p-3 z-20">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                ปิด
              </Button>
              {(isTargetEquipment && canUpdate && (assignedTo || editing)) && (
                <Button disabled={saving} className="bg-blue-600 hover:bg-blue-700" onClick={async () => {
                  if (!taskId) return
                  setSaving(true)
                  await submitReport(taskId, notes, selectedFiles, selectedStatus)
                  setSaving(false)
                }}>{saving ? 'บันทึก...' : 'บันทึก'}</Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
