"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Trash2 } from "lucide-react"

export default function AdminEquipmentPage() {
  const router = useRouter()
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
            <div className="mb-4">
              <Button onClick={() => router.push('/admin/dashboard')}>กลับไปหน้า Admin</Button>
            </div>

            {loading ? <div>Loading...</div> : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>รหัส</TableHead>
                      <TableHead>ครุภัณฑ์</TableHead>
                      <TableHead>สถานที่</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((it) => (
                      <TableRow key={it.id}>
                        <TableCell>{it.id}</TableCell>
                        <TableCell>{it.name || it.equipment_name || it.code}</TableCell>
                        <TableCell>{it.room || `${it.building || ''} ${it.floor || ''}`}</TableCell>
                        <TableCell>{it.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setEditing(it)}><Edit className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={async () => {
                              if (!confirm('ลบอุปกรณ์ใช่หรือไม่?')) return
                              try {
                                const res = await fetch(`/api/equipment?id=${it.id}`, { method: 'DELETE' })
                                const j = await res.json()
                                if (res.ok) {
                                  load()
                                } else {
                                  alert(j.error || 'ลบไม่สำเร็จ')
                                }
                              } catch (e) { console.error(e); alert('ลบไม่สำเร็จ') }
                            }}><Trash2 className="w-4 h-4"/></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
