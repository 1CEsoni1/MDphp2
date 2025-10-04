"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// icons removed for simplified list UI

export default function AdminEquipmentPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/equipment')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>จัดการครุภัณฑ์ (หน้าเบื้องต้น)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button onClick={() => router.push('/admin/dashboard')}>กลับไปหน้า Admin</Button>
                <h2 className="text-lg font-semibold">จัดการครุภัณฑ์ (หน้าเบื้องต้น)</h2>
              </div>
              <div className="flex-1 sm:max-w-sm">
                <Input
                  placeholder="ค้นหารหัสครุภัณฑ์ หรือชื่อ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            {loading ? <div>Loading...</div> : (
              <>
                {/* Card list for small screens */}
                <div className="space-y-3 sm:hidden">
                  {items
                    .filter((it) => {
                      const q = searchTerm.trim().toLowerCase()
                      if (!q) return true
                      return (
                        String(it.name || it.equipment_name || it.code).toLowerCase().includes(q) ||
                        String(it.id).toLowerCase().includes(q) ||
                        String(it.room || '').toLowerCase().includes(q)
                      )
                    })
                    .map((it) => (
                      <div key={it.id} className="p-3 bg-white rounded-lg border shadow-sm flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{it.name || it.equipment_name || it.code}</div>
                          <div className="text-xs text-gray-500">{it.id} • {it.room || `${it.building || ''} ${it.floor || ''}`}</div>
                        </div>
                        <div className="ml-3 text-right">
                          <div className={`inline-block text-xs px-2 py-1 rounded-full ${it.status === 'repair' ? 'bg-red-100 text-red-700' : it.status === 'maintenance' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {it.status}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                  <TableHeader>
                    <TableRow className="bg-white">
                      <TableHead className="sticky top-0 bg-white w-16">รหัส</TableHead>
                      <TableHead className="sticky top-0 bg-white">ครุภัณฑ์</TableHead>
                      <TableHead className="sticky top-0 bg-white w-48">สถานที่</TableHead>
                      <TableHead className="sticky top-0 bg-white w-32">สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items
                      .filter((it) => {
                        const q = searchTerm.trim().toLowerCase()
                        if (!q) return true
                        return (
                          String(it.name || it.equipment_name || it.code).toLowerCase().includes(q) ||
                          String(it.id).toLowerCase().includes(q) ||
                          String(it.room || '').toLowerCase().includes(q)
                        )
                      })
                      .map((it, idx) => (
                      <TableRow key={it.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <TableCell className="py-3 w-16">{it.id}</TableCell>
                        <TableCell className="py-3">{it.name || it.equipment_name || it.code}</TableCell>
                        <TableCell className="py-3 w-48">{it.room || `${it.building || ''} ${it.floor || ''}`}</TableCell>
                        <TableCell className="py-3 w-32"> 
                          <div className={`inline-block text-sm px-2 py-1 rounded-full ${it.status === 'repair' ? 'bg-red-100 text-red-700' : it.status === 'maintenance' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {it.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

    // Edit dialog UI at bottom
    function EditDialog({ editing, onClose, onSaved }: { editing: any | null, onClose: () => void, onSaved: () => void }) {
      const [form, setForm] = useState<any>(editing || {})
      useEffect(() => setForm(editing || {}), [editing])

      if (!editing) return null

      const save = async () => {
        try {
          const body = { id: editing.id, name: form.name, code: form.code, status: form.status }
          const res = await fetch('/api/equipment', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          const j = await res.json()
          if (res.ok) {
            onSaved()
            onClose()
          } else {
            alert(j.error || 'บันทึกไม่สำเร็จ')
          }
        } catch (e) { console.error(e); alert('บันทึกไม่สำเร็จ') }
      }

      return (
        <Dialog open={Boolean(editing)} onOpenChange={(open) => { if (!open) onClose() }}>
          <DialogContent className="max-w-md mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle>แก้ไขครุภัณฑ์ #{editing.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm">ชื่อ</label>
                <Input value={form.name || ''} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">รหัส</label>
                <Input value={form.code || ''} onChange={(e: any) => setForm({ ...form, code: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">สถานะ</label>
                <Select value={form.status || 'working'} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working">ใช้งานได้</SelectItem>
                    <SelectItem value="repair">ต้องซ่อม</SelectItem>
                    <SelectItem value="maintenance">บำรุงรักษา</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
                <Button onClick={save}>บันทึก</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
