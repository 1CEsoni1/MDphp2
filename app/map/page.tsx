"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  ArrowLeft,
  MapPin,
  Monitor,
  Snowflake,
  Wrench,
  Zap,
  Plus,
  Edit,
  Users,
  Wifi,
  Settings,
  Camera,
  User,
  LogOut,
  Menu,
  Building,
  BarChart3,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
// import { auth } from "@/lib/auth"
import { auth } from "@/lib/auth"
// import { storage, type RepairRequest } from "@/lib/storage"
import { Notification } from "@/components/notification"

interface RepairRequest {
  id?: string
  equipment_name: string
  equipment_code: string
  building: string
  floor: number
  room: string
  description: string
  priority: "low" | "medium" | "high"
  reporter: string
  status: string
  report_date: string
}

interface Equipment {
  id: string
  name: string
  code: string
  type: "computer" | "ac" | "projector" | "electrical" | "router"
  status: "working" | "repair" | "maintenance"
  position: { x: number; y: number }
  tableNumber: number
  side: "left" | "right"
  row: number
  seat: number
  room: string
  building: string
  floor: string
  needsRepair?: boolean
  repairDescription?: string
}

// LC207 Equipment Data - 50 computers arranged in left-right layout
const lc207Equipment: Equipment[] = [
  // Left side - Row 1 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    name: `คอมพิวเตอร์ ${String(i + 1).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 1).padStart(2, "0")}`,
    type: "computer" as const,
    status: i === 1 ? ("repair" as const) : ("working" as const),
    position: { x: 15 + i * 5, y: 25 },
    tableNumber: i + 1,
    side: "left" as const,
    row: 1,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
    needsRepair: i === 1,
    repairDescription: i === 1 ? "จอไม่แสดงผล" : undefined,
  })),

  // Left side - Row 2 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 6}`,
    name: `คอมพิวเตอร์ ${String(i + 6).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 6).padStart(2, "0")}`,
    type: "computer" as const,
    status: i === 2 ? ("maintenance" as const) : ("working" as const),
    position: { x: 15 + i * 5, y: 35 },
    tableNumber: i + 6,
    side: "left" as const,
    row: 2,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Left side - Row 3 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 11}`,
    name: `คอมพิวเตอร์ ${String(i + 11).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 11).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 15 + i * 5, y: 45 },
    tableNumber: i + 11,
    side: "left" as const,
    row: 3,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Left side - Row 4 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 16}`,
    name: `คอมพิวเตอร์ ${String(i + 16).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 16).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 15 + i * 5, y: 55 },
    tableNumber: i + 16,
    side: "left" as const,
    row: 4,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Left side - Row 5 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 21}`,
    name: `คอมพิวเตอร์ ${String(i + 21).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 21).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 15 + i * 5, y: 65 },
    tableNumber: i + 21,
    side: "left" as const,
    row: 5,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Right side - Row 1 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 26}`,
    name: `คอมพิวเตอร์ ${String(i + 26).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 26).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 55 + i * 5, y: 25 },
    tableNumber: i + 26,
    side: "right" as const,
    row: 1,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Right side - Row 2 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 31}`,
    name: `คอมพิวเตอร์ ${String(i + 31).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 31).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 55 + i * 5, y: 35 },
    tableNumber: i + 31,
    side: "right" as const,
    row: 2,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Right side - Row 3 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 36}`,
    name: `คอมพิวเตอร์ ${String(i + 36).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 36).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 55 + i * 5, y: 45 },
    tableNumber: i + 36,
    side: "right" as const,
    row: 3,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Right side - Row 4 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 41}`,
    name: `คอมพิวเตอร์ ${String(i + 41).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 41).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 55 + i * 5, y: 55 },
    tableNumber: i + 41,
    side: "right" as const,
    row: 4,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Right side - Row 5 (5 computers)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 46}`,
    name: `คอมพิวเตอร์ ${String(i + 46).padStart(2, "0")}`,
    code: `PC-LC207-${String(i + 46).padStart(2, "0")}`,
    type: "computer" as const,
    status: "working" as const,
    position: { x: 55 + i * 5, y: 65 },
    tableNumber: i + 46,
    side: "right" as const,
    row: 5,
    seat: i + 1,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  })),

  // Other equipment
  {
    id: "51",
    name: "โปรเจคเตอร์",
    code: "PJ-LC207-01",
    type: "projector",
    status: "working",
    position: { x: 45, y: 10 },
    tableNumber: 0,
    side: "left",
    row: 0,
    seat: 0,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  },
  {
    id: "53",
    name: "Router",
    code: "RT-LC207-01",
    type: "router",
    status: "working",
    position: { x: 85, y: 50 },
    tableNumber: 0,
    side: "right",
    row: 0,
    seat: 0,
    room: "LC207",
    building: "ตึก LC",
    floor: "ชั้น 2",
  },
]

export default function MapPage() {
  const router = useRouter()
  const [selectedBuilding, setSelectedBuilding] = useState("lc")
  const [selectedFloor, setSelectedFloor] = useState("floor-2")
  const [selectedRoom, setSelectedRoom] = useState("lc207")
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [mapNotes, setMapNotes] = useState("")
  const [mapSelectedFiles, setMapSelectedFiles] = useState<File[]>([])
  const [showEquipmentDialog, setShowEquipmentDialog] = useState(false)
  const [showAddRepairDialog, setShowAddRepairDialog] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<{
    show: boolean
    type: "success" | "error" | "info"
    message: string
  }>({ show: false, type: "info", message: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // ตรวจสอบสิทธิ์ผู้ใช้จาก localStorage
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      router.push("/");
      return;
    }
    const user = JSON.parse(userStr);
    setCurrentUser(user);
    
    // ดึงข้อมูลครุภัณฑ์จาก API
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/equipment/room/${selectedRoom.toUpperCase()}`);
        if (response.ok) {
          const data = await response.json();
          // ตรวจสอบโครงสร้างข้อมูลที่ได้จาก API
          const equipmentData = data.equipment || [];
          
          // เรียงลำดับข้อมูลตามรหัสครุภัณฑ์ก่อน
          const sortedEquipmentData = equipmentData.sort((a: any, b: any) => {
            const aNum = parseInt(a.code?.match(/(\d+)$/)?.[1] || '0');
            const bNum = parseInt(b.code?.match(/(\d+)$/)?.[1] || '0');
            return aNum - bNum;
          });
          
          // ดึงรายการซ่อมจาก API response
          const repairData = data.repairs || [];
          
          // สร้าง Map ของครุภัณฑ์ที่มีการแจ้งซ่อม (status ไม่เท่ากับ completed)
          const repairMap = new Map();
          repairData.forEach((repair: any) => {
            if (repair.status !== 'completed') {
              repairMap.set(repair.equipment_code, repair.status);
            }
          });
          
          // แปลงข้อมูลให้ตรงกับ interface Equipment
          const formattedEquipment: Equipment[] = sortedEquipmentData.map((item: any, index: number) => {
            // ถ้าไม่มีตำแหน่งในฐานข้อมูล ให้สร้างตำแหน่งอัตโนมัติ
            let positionX = item.position_x;
            let positionY = item.position_y;
            
            // ดึงหมายเลขจากรหัสครุภัณฑ์ เช่น PC-LC207-05 -> 5
            const codeMatch = item.code?.match(/(\d+)$/);
            let tableNumber = item.table_number || (codeMatch ? parseInt(codeMatch[1]) : index + 1);
            
            let side = item.side;
            let row = item.row_number;
            
            // ถ้าตำแหน่งเป็น 0,0 ให้สร้างตำแหน่งใหม่แบบ grid layout
            if ((positionX === 0 || !positionX) && (positionY === 0 || !positionY)) {
              const isLeftSide = index < sortedEquipmentData.length / 2;
              side = isLeftSide ? 'left' : 'right';
              
              if (isLeftSide) {
                // ฝั่งซ้าย - 5 เครื่องต่อแถว, 5 แถว
                const leftIndex = index;
                const rowIndex = Math.floor(leftIndex / 5);
                const colIndex = leftIndex % 5;
                positionX = 15 + (colIndex * 5); // เริ่มจาก 15%, ห่างกัน 5%
                positionY = 25 + (rowIndex * 10); // เริ่มจาก 25%, ห่างกัน 10%
                row = rowIndex + 1;
              } else {
                // ฝั่งขวา - 5 เครื่องต่อแถว, 5 แถว
                const rightIndex = index - Math.ceil(sortedEquipmentData.length / 2);
                const rowIndex = Math.floor(rightIndex / 5);
                const colIndex = rightIndex % 5;
                positionX = 60 + (colIndex * 5); // เริ่มจาก 60%, ห่างกัน 5% (ปรับจาก 55% เป็น 60%)
                positionY = 25 + (rowIndex * 10); // เริ่มจาก 25%, ห่างกัน 10%
                row = rowIndex + 1;
              }
            }
            
            // กำหนดสถานะตามข้อมูลจาก tb_repair_requests
            let equipmentStatus = 'working'; // ค่าเริ่มต้น = ใช้งานได้
            if (repairMap.has(item.code)) {
              // ถ้ามีการแจ้งซ่อมที่ยังไม่เสร็จ
              const repairStatus = repairMap.get(item.code);
              equipmentStatus = 'repair'; // เครื่องต้องซ่อม
            }
            
            const equipment = {
              id: item.id?.toString() || '',
              name: item.name || '',
              code: item.code || '',
              type: item.type || 'computer',
              status: equipmentStatus, // ใช้สถานะจาก repair_requests
              position: { x: positionX, y: positionY },
              tableNumber: tableNumber,
              side: side || 'left',
              row: row || 1,
              seat: (index % 5) + 1,
              room: item.room || '',
              building: item.building || '',
              floor: item.floor?.toString() || '',
            };
            
            return equipment;
          });
          
          setEquipmentList(formattedEquipment);
        } else {
          console.error('Failed to fetch equipment data');
          setEquipmentList([]);
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setEquipmentList([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEquipment();
  }, [router, selectedRoom])

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ show: true, type, message })
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    showNotification("success", "ออกจากระบบสำเร็จ")
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const goToDashboard = () => {
    if (currentUser?.type_id === "01") {
      router.push("/admin/dashboard")
    } else if (currentUser?.type_id === "02") {
      router.push("/technician/dashboard")
    } else {
      router.push("/")
    }
  }

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case "computer":
        return <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
      case "ac":
        return <Snowflake className="w-3 h-3 sm:w-4 sm:h-4" />
      case "projector":
        return <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
      case "router":
        return <Wifi className="w-3 h-3 sm:w-4 sm:h-4" />
      case "electrical":
        return <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
      default:
        return <Wrench className="w-3 h-3 sm:w-4 sm:h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "working":
        return "bg-green-500 hover:bg-green-600 shadow-green-200" // ใช้งานได้ - สีเขียว
      case "repair":
        return "bg-red-500 hover:bg-red-600 shadow-red-200" // ต้องซ่อม - สีแดง
      default:
        return "bg-green-500 hover:bg-green-600 shadow-green-200" // ค่าเริ่มต้น = ใช้งานได้
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
        return <Badge className="bg-green-100 text-green-800 border-green-200">ใช้งานได้</Badge>
      case "repair":
        return <Badge className="bg-red-100 text-red-800 border-red-200">ต้องซ่อม</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">บำรุงรักษา</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const getTablePosition = (equipment: Equipment) => {
    if (equipment.tableNumber === 0) return "อุปกรณ์พิเศษ"
    return `โต๊ะที่ ${equipment.tableNumber} (ฝั่ง${equipment.side === "left" ? "ซ้าย" : "ขวา"} แถว ${equipment.row})`
  }

  const handleCreateRepairRequest = async (
    equipment: Equipment,
    description: string,
    priority: "low" | "medium" | "high",
    reporter: string,
  ) => {
    try {
      const newRequest = {
        equipment_name: equipment.name,
        equipment_code: equipment.code,
        building: equipment.building,
        floor: parseInt(equipment.floor),
        room: equipment.room,
        description,
        priority,
        reporter: reporter || currentUser?.name || "ไม่ระบุ",
        status: "pending",
        report_date: new Date().toISOString().split("T")[0],
      };

      const response = await fetch('/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showNotification("success", result.message || "สร้างรายการแจ้งซ่อมสำเร็จ")
        setShowAddRepairDialog(false)
        setSelectedEquipment(null)
        // รีเฟรชข้อมูลครุภัณฑ์
        window.location.reload()
      } else {
        showNotification("error", result.message || "ไม่สามารถสร้างรายการแจ้งซ่อมได้")
      }
    } catch (error) {
      console.error('Error creating repair request:', error);
      showNotification("error", "เกิดข้อผิดพลาดในการสร้างรายการแจ้งซ่อม")
    }
  }

  // Mobile Controls Component
  const MobileControls = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">อาคาร</label>
        <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lc">ตึก LC</SelectItem>
            <SelectItem value="ud">ตึก UD</SelectItem>
            <SelectItem value="building-a">อาคาร A</SelectItem>
            <SelectItem value="building-b">อาคาร B</SelectItem>
            <SelectItem value="building-c">อาคาร C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">ชั้น</label>
        <Select value={selectedFloor} onValueChange={setSelectedFloor}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floor-1">ชั้น 1</SelectItem>
            <SelectItem value="floor-2">ชั้น 2</SelectItem>
            <SelectItem value="floor-3">ชั้น 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">ห้อง</label>
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lc204">ห้อง LC204</SelectItem>
            <SelectItem value="lc205">ห้อง LC205</SelectItem>
            <SelectItem value="lc207">ห้อง LC207</SelectItem>
            <SelectItem value="room-a201">ห้อง A201</SelectItem>
            <SelectItem value="room-a202">ห้อง A202</SelectItem>
            <SelectItem value="room-a203">ห้อง A203</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Admin Actions */}
      {currentUser?.type_id === "01" && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">การจัดการ</h4>
          <div className="space-y-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => {
                setShowAddRepairDialog(true)
                setShowMobileControls(false)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              สร้างรายการซ่อม
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => showNotification("info", "ฟีเจอร์นี้กำลังพัฒนา")}
            >
              <Edit className="w-4 h-4 mr-2" />
              จัดการครุภัณฑ์
            </Button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium mb-3">สัญลักษณ์</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">ใช้งานได้</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">ต้องซ่อม</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">บำรุงรักษา</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" onClick={goToDashboard} className="hidden sm:flex">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ Dashboard
              </Button>

              {/* Mobile Menu */}
              <Sheet open={showMobileControls} onOpenChange={setShowMobileControls}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="sm:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-orange-600" />
                      เลือกตำแหน่ง
                    </SheetTitle>
                    <SheetDescription>เลือกอาคาร ชั้น และห้องที่ต้องการดู</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <div className="mb-4 pb-4 border-b">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setShowMobileControls(false)
                          goToDashboard()
                        }}
                        className="w-full justify-start"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        กลับ Dashboard
                      </Button>
                    </div>
                    <MobileControls />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-semibold text-gray-900">แผนผังครุภัณฑ์</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">ระบุตำแหน่งครุภัณฑ์ในอาคาร</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{currentUser?.name}</span>
                <Badge variant="outline" className="text-xs">
                  {currentUser?.type_id === "01" ? "Admin" : "Technician"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">ออกจากระบบ</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Desktop Controls */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-600" />
                  เลือกตำแหน่ง
                </CardTitle>
                <CardDescription>เลือกอาคาร ชั้น และห้องที่ต้องการดู</CardDescription>
              </CardHeader>
              <CardContent>
                <MobileControls />
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      แผนผังห้อง {selectedRoom.toUpperCase()}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      ห้องคอมพิวเตอร์ - คลิกที่จุดครุภัณฑ์เพื่อดูรายละเอียด
                      {loading && " (กำลังโหลดข้อมูล...)"}
                    </CardDescription>
                  </div>

                  {/* Mobile Quick Stats */}
                  <div className="flex gap-2 sm:hidden">
                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {equipmentList.filter((eq) => eq.status === "working").length}
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {equipmentList.filter((eq) => eq.status === "repair").length}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div
                  className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner"
                  style={{ height: "500px", minHeight: "500px" }}
                >
                  {/* Room Layout */}
                  <div className="absolute inset-2 sm:inset-4 bg-white rounded-lg border-2 border-gray-300 shadow-sm">
                    {/* Door */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 h-2 sm:h-3 bg-gray-300 rounded-t-md">
                      <div className="text-xs text-center text-gray-600 mt-0.5 hidden sm:block">ประตู</div>
                    </div>

                    {/* Room Label */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <h3 className="text-sm sm:text-xl font-bold text-gray-700">ห้อง {selectedRoom.toUpperCase()}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        ห้องคอมพิวเตอร์ ({loading ? "กำลังโหลด..." : `${equipmentList.length} เครื่อง`})
                      </p>
                    </div>

                    {/* Side Labels - Hidden on mobile */}
                    <div className="hidden sm:block absolute top-20 left-8 text-sm font-medium text-blue-600 transform -rotate-90 origin-center">
                      ฝั่งซ้าย
                    </div>
                    <div className="hidden sm:block absolute top-20 right-8 text-sm font-medium text-green-600 transform rotate-90 origin-center">
                      ฝั่งขวา
                    </div>

                    {/* Center Aisle */}
                    <div className="absolute left-1/2 top-16 sm:top-20 bottom-8 sm:bottom-10 w-0.5 sm:w-1 bg-gray-300 transform -translate-x-1/2">
                      <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white px-2 py-1 rounded whitespace-nowrap">
                        ทางเดิน
                      </div>
                    </div>

                    {/* Equipment Points */}
                    {loading ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
                        <div className="text-gray-500">กำลังโหลดข้อมูลครุภัณฑ์...</div>
                      </div>
                    ) : equipmentList.length === 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-gray-500 text-center">
                          <div className="mb-2">ไม่พบข้อมูลครุภัณฑ์ในห้อง {selectedRoom.toUpperCase()}</div>
                          <div className="text-sm">กรุณาเลือกห้องอื่นหรือติดต่อผู้ดูแลระบบ</div>
                        </div>
                      </div>
                    ) : (
                      equipmentList.map((equipment) => (
                        <div
                          key={equipment.id}
                          className={`absolute w-6 h-6 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer border-2 border-white ${getStatusColor(equipment.status)}`}
                          style={{
                            left: `${equipment.position.x}%`,
                            top: `${equipment.position.y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          title={`${equipment.name} (${equipment.code}) - โต๊ะที่ ${equipment.tableNumber}`}
                          onClick={() => {
                            setSelectedEquipment(equipment)
                            setShowEquipmentDialog(true)
                          }}
                        >
                          {equipment.type === "computer" ? (
                            <span className="text-xs sm:text-sm font-bold">
                              {equipment.tableNumber > 0 ? equipment.tableNumber : ""}
                            </span>
                          ) : (
                            getEquipmentIcon(equipment.type)
                          )}
                        </div>
                      ))
                    )}

                    {/* Desk Outlines - Simplified for mobile */}
                    <div className="absolute" style={{ left: "10%", top: "20%", width: "30%", height: "50%" }}>
                      <div className="w-full h-full border-2 border-dashed border-blue-300 rounded bg-blue-50 opacity-30">
                      </div>
                    </div>

                    <div className="absolute" style={{ left: "55%", top: "20%", width: "30%", height: "50%" }}>
                      <div className="w-full h-full border-2 border-dashed border-green-300 rounded bg-green-50 opacity-30">
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment Summary */}
                <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Room Statistics */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      สถิติห้อง {selectedRoom.toUpperCase()}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">ครุภัณฑ์ทั้งหมด:</span>
                        <span className="text-sm font-medium">{equipmentList.length} รายการ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">คอมพิวเตอร์:</span>
                        <span className="text-sm font-medium">{equipmentList.filter(eq => eq.type === 'computer').length} เครื่อง</span>
                      </div>
                      <div className="hidden sm:block">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">ฝั่งซ้าย:</span>
                          <span className="text-sm font-medium">{equipmentList.filter(eq => eq.side === 'left').length} เครื่อง</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">ฝั่งขวา:</span>
                          <span className="text-sm font-medium">{equipmentList.filter(eq => eq.side === 'right').length} เครื่อง</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">ใช้งานได้:</span>
                        <span className="text-sm font-medium text-green-600">
                          {equipmentList.filter((eq) => eq.status === "working").length} รายการ
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">ต้องซ่อม:</span>
                        <span className="text-sm font-medium text-red-600">
                          {equipmentList.filter((eq) => eq.status === "repair").length} รายการ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions for Admin */}
                  {currentUser?.type_id === "01" && (
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 shadow-sm">
                      <h4 className="text-sm font-semibold text-orange-800 mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        การจัดการด่วน
                      </h4>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start text-orange-700 border-orange-300 hover:bg-orange-100 bg-transparent"
                          onClick={() => setShowAddRepairDialog(true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          สร้างรายการแจ้งซ่อม
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start text-orange-700 border-orange-300 hover:bg-orange-100 bg-transparent"
                          onClick={() => showNotification("info", "ฟีเจอร์การจัดการครุภัณฑ์กำลังพัฒนา")}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          จัดการครุภัณฑ์
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start text-orange-700 border-orange-300 hover:bg-orange-100 bg-transparent"
                          onClick={() => showNotification("info", "ฟีเจอร์รายงานกำลังพัฒนา")}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          ดูรายงาน
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Equipment Detail Dialog */}
      <Dialog open={showEquipmentDialog} onOpenChange={setShowEquipmentDialog}>
        <DialogContent className="max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEquipment && getEquipmentIcon(selectedEquipment.type)}
              รายละเอียดครุภัณฑ์
            </DialogTitle>
            <DialogDescription>ข้อมูลและสถานะของครุภัณฑ์</DialogDescription>
          </DialogHeader>

          {selectedEquipment && (
            <EquipmentDetailContent
              equipment={selectedEquipment}
              onCreateRepair={() => {
                setShowEquipmentDialog(false)
                setShowAddRepairDialog(true)
              }}
              isAdmin={currentUser?.type_id === "01"}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Repair Request Dialog */}
      <Dialog open={showAddRepairDialog} onOpenChange={setShowAddRepairDialog}>
        <DialogContent className="max-w-3xl mx-4 sm:mx-auto max-h-[95vh] overflow-y-auto p-0 border-0 shadow-2xl">
          <div className="p-6">
            <AddRepairRequestForm
              equipment={selectedEquipment}
              onSubmit={handleCreateRepairRequest}
              onCancel={() => setShowAddRepairDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </div>
  )
}

function EquipmentDetailContent({
  equipment,
  onCreateRepair,
  isAdmin,
}: {
  equipment: Equipment
  onCreateRepair: () => void
  isAdmin: boolean
}) {
  const [notes, setNotes] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const [localNotification, setLocalNotification] = useState<{ show: boolean; type: "success" | "error" | "info"; message: string }>({ show: false, type: 'info', message: '' })
  const [savingLocal, setSavingLocal] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const images = files.filter((f) => f.type && f.type.startsWith('image/'))
    setSelectedFiles((prev) => [...prev, ...images])
  }

  const submitUpdate = async (repairId: string, status: string) => {
      try {
  const user = auth.getCurrentUser()
  const changedBy = user?.user_id || user?.userId || user?.id || user?.name || null
  // send assignedTo so server records which technician accepted/saved the job
  const assignedToVal = user?.user_id || user?.userId || user?.id || null

  if (selectedFiles && selectedFiles.length > 0) {
        const fd = new FormData()
        fd.append('notes', notes || '')
        fd.append('status', status)
  if (assignedToVal) fd.append('assignedTo', String(assignedToVal))
        if (changedBy) fd.append('changedBy', String(changedBy))
        selectedFiles.forEach((f) => fd.append('files', f))

        const res = await fetch(`/api/repair-requests/${encodeURIComponent(String(repairId))}`, { method: 'PATCH', body: fd })
        if (res.ok) {
          setLocalNotification({ show: true, type: 'success', message: 'บันทึกข้อมูลสำเร็จ' })
          setNotes('')
          setSelectedFiles([])
          // notify other parts of the app (dashboard) to refresh tasks
          try {
            window.dispatchEvent(new CustomEvent('repairRequestUpdated', { detail: { id: repairId, status } }))
            try {
              localStorage.setItem('repairRequestUpdated', JSON.stringify({ id: repairId, status, ts: Date.now() }))
              setTimeout(() => localStorage.removeItem('repairRequestUpdated'), 1000)
            } catch (e) {
              // ignore localStorage errors
            }
          } catch (e) {
            // ignore
          }
            // navigate back to technician dashboard so user can see updated tasks
            try {
              router.push('/technician/dashboard')
            } catch (e) {
              window.location.href = '/technician/dashboard'
            }
          } else {
          const body = await res.json().catch(() => null)
          setLocalNotification({ show: true, type: 'error', message: 'ไม่สามารถบันทึก: ' + (body?.message || body?.error || res.status) })
        }
      } else {
        const payload: any = { notes, status }
        if (changedBy) payload.changedBy = changedBy
        if (assignedToVal) payload.assignedTo = assignedToVal
        const res = await fetch(`/api/repair-requests/${encodeURIComponent(String(repairId))}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (res.ok) {
          setLocalNotification({ show: true, type: 'success', message: 'บันทึกข้อมูลสำเร็จ' })
          setNotes('')
          try {
            window.dispatchEvent(new CustomEvent('repairRequestUpdated', { detail: { id: repairId, status } }))
            try {
              localStorage.setItem('repairRequestUpdated', JSON.stringify({ id: repairId, status, ts: Date.now() }))
              setTimeout(() => localStorage.removeItem('repairRequestUpdated'), 1000)
            } catch (e) {
              // ignore localStorage errors
            }
          } catch (e) {
            // ignore
          }
          try {
            router.push('/technician/dashboard')
          } catch (e) {
            try {
              router.push('/technician/dashboard')
            } catch (e) {
              window.location.href = '/technician/dashboard'
            }
          }
          } else {
          const body = await res.json().catch(() => null)
          setLocalNotification({ show: true, type: 'error', message: 'ไม่สามารถบันทึก: ' + (body?.message || body?.error || res.status) })
        }
      }
    } catch (e) {
      console.error(e)
      setLocalNotification({ show: true, type: 'error', message: 'เกิดข้อผิดพลาดในการบันทึก' })
    } finally {
      setSavingLocal(false)
    }
  }

  const getEquipmentTypeName = (type: string) => {
    switch (type) {
      case "computer":
        return "คอมพิวเตอร์"
      case "ac":
        return "เครื่องปรับอากาศ"
      case "projector":
        return "โปรเจคเตอร์"
      case "router":
        return "Router"
      case "electrical":
        return "ระบบไฟฟ้า"
      default:
        return "ครุภัณฑ์"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
      case "repair":
        return <Badge className="bg-red-100 text-red-800 border-red-200">ต้องซ่อม</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">บำรุงรักษา</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const getTablePosition = (equipment: Equipment) => {
    if (equipment.tableNumber === 0) return "อุปกรณ์พิเศษ"
    return `โต๊ะที่ ${equipment.tableNumber} (ฝั่ง${equipment.side === "left" ? "ซ้าย" : "ขวา"} แถว ${equipment.row} ที่นั่ง ${equipment.seat})`
  }

  return (
    <div className="space-y-4">
      {/* Equipment Info */}
        <div>
          <Label className="text-sm font-medium text-gray-600">ชื่อครุภัณฑ์</Label>
          <p className="text-sm font-semibold">{equipment.name}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">รหัส</Label>
          <p className="text-sm font-semibold">{equipment.code}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">ประเภท</Label>
          <p className="text-sm">{getEquipmentTypeName(equipment.type)}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">ห้อง</Label>
          <p className="text-sm">{equipment.room}</p>
        </div>
      

      {/* Table Position */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-800">ตำแหน่งโต๊ะ</Label>
        <p className="text-sm font-semibold text-blue-700">{getTablePosition(equipment)}</p>
        {equipment.tableNumber > 0 && (
          <div className="mt-2 text-xs text-blue-600 space-y-1">
            <div>• ฝั่ง: {equipment.side === "left" ? "ซ้าย" : "ขวา"}</div>
            <div>• แถวที่: {equipment.row}</div>
            <div>• ที่นั่งที่: {equipment.seat}</div>
          </div>
        )}
      </div>

      {/* Status */}
      <div>
        <Label className="text-sm font-medium text-gray-600 mb-2 block">สถานะปัจจุบัน</Label>
        <div className="flex items-center gap-2">{getStatusBadge(equipment.status)}</div>
      </div>

      {/* Repair Description */}
      {equipment.repairDescription && (
        <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
          <Label className="text-sm font-medium text-red-800">รายละเอียดปัญหา</Label>
          <p className="text-sm text-red-700 mt-1">{equipment.repairDescription}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        {isAdmin && (
          <Button
            size="sm"
            onClick={onCreateRepair}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            สร้างรายการซ่อม
          </Button>
        )}
      </div>

      {/* Technician quick report section - allow notes and image upload similar to dashboard */}
      <div className="mt-4 border-t pt-4">
        <Label className="text-sm font-medium text-gray-700">หมายเหตุ / อัปโหลดภาพ</Label>
        <Textarea placeholder="เพิ่มหมายเหตุการซ่อม..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-2" />
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center mt-3">
          <p className="text-sm text-gray-600 mb-2">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง (รูปภาพเท่านั้น)</p>
          <input ref={fileInputRef} id={`map-file-${equipment.id}`} type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
          <Button variant="outline" className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Camera className="w-4 h-4 mr-2" /> เลือกไฟล์
          </Button>
          {selectedFiles.length > 0 && <div className="mt-3 text-sm text-green-600">เลือกไฟล์แล้ว: {selectedFiles.length} ไฟล์</div>}
        </div>
          <div className="flex gap-2 justify-end mt-3">
          <Button variant="outline" onClick={() => { setNotes(''); setSelectedFiles([]) }}>ล้าง</Button>
          {/* For map we may not have a repair id; only allow submit when equipment has an associated repair task id in URL or via other flow. We'll attempt to submit to a repair id parsed from URL if available */}
          <Button disabled={savingLocal} className="bg-blue-600 text-white" onClick={() => {
            // try to extract repair id from current URL (map page may create repair separately). If not found, notify user to create a repair from dashboard.
            const m = window.location.pathname.match(/room-map\/(\d+)/)
            if (m && m[1]) {
              // saving from map should mark as completed
              setSavingLocal(true)
              submitUpdate(m[1], 'completed')
            } else {
              setLocalNotification({ show: true, type: 'info', message: 'ไม่พบรหัสงานซ่อมใน URL โปรดเปิดรายการงานจากหน้าดashboard หรือสร้างรายการแจ้งซ่อมก่อน' })
            }
          }}>บันทึก</Button>
        </div>
      </div>
      <Notification type={localNotification.type} message={localNotification.message} show={localNotification.show} onClose={() => setLocalNotification({ ...localNotification, show: false })} />
    </div>
  )
}

function AddRepairRequestForm({
  equipment,
  onSubmit,
  onCancel,
}: {
  equipment: Equipment | null
  onSubmit: (equipment: Equipment, description: string, priority: "low" | "medium" | "high", reporter: string) => void
  onCancel: () => void
}) {
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [reporter, setReporter] = useState("")

  const handleSubmit = () => {
    if (!equipment || !description.trim() || !reporter.trim()) {
      alert("กรุณากรอกรายละเอียดปัญหาและชื่อผู้แจ้งให้ครบถ้วน")
      return
    }

    onSubmit(equipment, description, priority, reporter)
    setDescription("")
    setPriority("medium")
    setReporter("")
  }

  if (!equipment) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-4">
          <Wrench className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">ยังไม่ได้เลือกครุภัณฑ์</h3>
        <p className="text-gray-500 mb-6 max-w-sm">กรุณาคลิกที่ครุภัณฑ์ในแผนผังเพื่อเลือกก่อนสร้างรายการแจ้งซ่อม</p>
        <Button variant="outline" onClick={onCancel} className="bg-white shadow-sm border-gray-200 hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          ปิด
        </Button>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200"
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200"
      case "low": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative text-center pb-8 border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-xl opacity-50"></div>
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            เพิ่มรายการแจ้งซ่อมใหม่
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            กรอกข้อมูลและรายละเอียดปัญหาเพื่อสร้างรายการแจ้งซ่อมครุภัณฑ์ 
            <br />ระบบจะจัดสรรช่างให้โดยอัตโนมัติ
          </p>
        </div>
      </div>

      {/* Equipment Info Card */}
      <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Monitor className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">ครุภัณฑ์ที่เลือก</h4>
            <p className="text-sm text-blue-600">ข้อมูลครุภัณฑ์ที่จะทำการแจ้งซ่อม</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              ชื่อครุภัณฑ์
            </Label>
            <p className="text-sm font-semibold text-gray-900 mt-1">{equipment.name}</p>
          </div>
          <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              รหัสครุภัณฑ์
            </Label>
            <p className="text-sm font-semibold text-gray-900 mt-1">{equipment.code}</p>
          </div>
          <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Building className="w-3 h-3" />
              สถานที่
            </Label>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {equipment.building} {equipment.floor} {equipment.room}
            </p>
          </div>
          <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              ตำแหน่ง
            </Label>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {equipment.tableNumber > 0 ? `โต๊ะที่ ${equipment.tableNumber}` : "อุปกรณ์พิเศษ"}
            </p>
          </div>
        </div>
      </div>

      {/* Auto Assignment Info */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-green-800 mb-1">การมอบหมายช่างอัตโนมัติ</h4>
            <p className="text-xs text-green-700 leading-relaxed">
              ระบบจะกำหนดช่างผู้รับผิดชอบโดยอัตโนมัติตามห้องที่เลือก <strong>({equipment.room})</strong> 
              โดยไม่ต้องเลือกช่างเอง เพื่อให้การแจกจ่ายงานเป็นไปอย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Reporter Field */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <Label htmlFor="reporter" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-blue-600" />
            </div>
            ชื่อผู้แจ้ง <span className="text-red-500">*</span>
          </Label>
          <Input
            id="reporter"
            type="text"
            placeholder="กรอกชื่อผู้พบปัญหา เช่น นาย สมชาย ใจดี, นางสาว มาลี สวยงาม"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
            className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 text-base"
          />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <p className="text-xs text-gray-500">ชื่อของบุคคลที่พบปัญหาและทำการแจ้งซ่อม</p>
          </div>
        </div>

        {/* Problem Description */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
              <Edit className="w-3.5 h-3.5 text-orange-600" />
            </div>
            รายละเอียดปัญหา <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="อธิบายปัญหาที่พบเจอให้ละเอียด เช่น:&#10;• หน้าจอไม่แสดงผล มีแต่หน้าจอดำ&#10;• เครื่องเปิดไม่ติด กดปุ่มไฟแล้วไม่มีอะไรเกิดขึ้น&#10;• คีย์บอร์ดเสีย กดแล้วตัวอักษรไม่ขึ้น&#10;• เมาส์ใช้งานไม่ได้ ขยับแล้วเคอร์เซอร์ไม่เลื่อน"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="resize-none border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 text-base"
          />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            <p className="text-xs text-gray-500">กรอกรายละเอียดปัญหาให้ชัดเจนและครอบคลุมเพื่อช่วยให้ช่างเข้าใจปัญหา</p>
          </div>
        </div>

        {/* Priority Selection */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <Label htmlFor="priority" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            </div>
            ระดับความสำคัญ
          </Label>
          <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-gray-200 p-2">
              <SelectItem value="high" className="focus:bg-red-50 rounded-lg mb-1 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full ring-2 ring-red-200"></div>
                  <div>
                    <p className="font-semibold text-red-700">🚨 สูง - เร่งด่วน</p>
                    <p className="text-xs text-red-600 mt-0.5">ต้องแก้ไขทันที ส่งผลกระทบต่อการใช้งาน</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="medium" className="focus:bg-amber-50 rounded-lg mb-1 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-amber-500 rounded-full ring-2 ring-amber-200"></div>
                  <div>
                    <p className="font-semibold text-amber-700">⚡ ปานกลาง - ปกติ</p>
                    <p className="text-xs text-amber-600 mt-0.5">แก้ไขตามลำดับ ไม่เร่งด่วนมาก</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="low" className="focus:bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full ring-2 ring-green-200"></div>
                  <div>
                    <p className="font-semibold text-green-700">💡 ต่ำ - ไม่เร่งด่วน</p>
                    <p className="text-xs text-green-600 mt-0.5">ปัญหาเล็กน้อย สามารถรอได้</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <div className={`mt-3 p-4 rounded-lg border-2 border-dashed ${getPriorityColor(priority)}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <p className="text-sm font-semibold">
                {priority === "high" && "ระดับเร่งด่วน - จะได้รับการแก้ไขเป็นอันดับแรก"}
                {priority === "medium" && "ระดับปกติ - จะได้รับการแก้ไขตามลำดับคิว"}
                {priority === "low" && "ระดับไม่เร่งด่วน - จะได้รับการแก้ไขเมื่อมีเวลาว่าง"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">พร้อมสร้างรายการแจ้งซ่อมแล้วใช่หรือไม่?</p>
              <p className="text-xs text-gray-500">กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนยืนยัน</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="h-12 px-6 bg-white border-gray-300 hover:bg-gray-50 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ยกเลิก
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-12 px-8 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              สร้างรายการแจ้งซ่อม
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
