"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AddRepairForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentCode: "",
    building: "",
    floor: "",
    room: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    reporter: "",
  })

  const handleSubmit = () => {
    if (!formData.equipmentName || !formData.equipmentCode || !formData.description || !formData.reporter) {
      alert("กรุณากรอกข้อมูลที่จำเป็น")
      return
    }
    ;(async () => {
      try {
        const payload = {
          equipment_code: formData.equipmentCode,
          equipment_name: formData.equipmentName,
          building: formData.building,
          floor: formData.floor,
          room: formData.room,
          description: formData.description,
          priority: formData.priority,
          reporter: formData.reporter,
          status: 'pending',
        }

        const res = await fetch('/api/repair-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const json = await res.json()
        if (res.ok && json.success) {
          try {
            // notify other parts of the app (map, dashboards) to refresh
            window.dispatchEvent(new CustomEvent('repairRequestUpdated', { detail: { id: json.id, status: payload.status } }))
            try { localStorage.setItem('repairRequestUpdated', JSON.stringify({ id: json.id, status: payload.status, ts: Date.now() })) } catch (e) {}
            setTimeout(() => { try { localStorage.removeItem('repairRequestUpdated') } catch (e) {} }, 1000)
          } catch (e) {
            // ignore notification errors
          }
          onSuccess()
          onClose()
        } else {
          alert(json.message || 'ไม่สามารถสร้างรายการแจ้งซ่อมได้')
        }
      } catch (e) {
        console.error('create repair error', e)
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
      }
    })()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="equipmentName">ชื่อครุภัณฑ์ *</Label>
          <Input
            id="equipmentName"
            placeholder="เช่น เครื่องปรับอากาศ"
            value={formData.equipmentName}
            onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="equipmentCode">รหัสครุภัณฑ์ *</Label>
          <Input
            id="equipmentCode"
            placeholder="เช่น EQ-001"
            value={formData.equipmentCode}
            onChange={(e) => setFormData({ ...formData, equipmentCode: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="building">อาคาร</Label>
          <Input
            id="building"
            placeholder="เช่น ตึก LC"
            value={formData.building}
            onChange={(e) => setFormData({ ...formData, building: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="floor">ชั้น</Label>
          <Input
            id="floor"
            placeholder="เช่น ชั้น 2"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="room">ห้อง</Label>
          <Input
            id="room"
            placeholder="เช่น LC207"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">รายละเอียดปัญหา *</Label>
        <Textarea
          id="description"
          placeholder="อธิบายปัญหาที่พบ..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="priority">ความสำคัญ</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">สูง</SelectItem>
              <SelectItem value="medium">ปานกลาง</SelectItem>
              <SelectItem value="low">ต่ำ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="reporter">ผู้แจ้ง *</Label>
          <Input
            id="reporter"
            placeholder="ชื่อผู้แจ้ง"
            value={formData.reporter}
            onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose} className="order-2 sm:order-1 bg-transparent">
          ยกเลิก
        </Button>
        <Button
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 order-1 sm:order-2"
          onClick={handleSubmit}
        >
          บันทึก
        </Button>
      </div>
    </div>
  )
}
