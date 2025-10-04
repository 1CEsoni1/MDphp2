"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Calendar,
  Edit,
  Eye,
  LogOut,
  MapPin,
  Package,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  Users,
  Menu,
  Filter,
  BarChart3,
  Home,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
// import { auth } from "@/lib/auth"
// TODO: migrate to API-backed endpoints. For now read/write requests from localStorage
// Local minimal type for repair requests (matches previous mock shape)
type RepairRequest = {
  id: string
  equipmentName: string
  equipmentCode: string
  location: { building?: string; floor?: string; room?: string }
  description?: string
  priority?: "low" | "medium" | "high"
  reporter?: string
  assignedTo?: string
  status?: string
  reportDate?: string
  completedDate?: string
  [k: string]: any
}
import { Notification } from "@/components/notification"
import AddRepairForm from "@/components/admin/AddRepairForm"

export default function AdminDashboard() {
  const router = useRouter()
  const [requests, setRequests] = useState<RepairRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRequest, setEditingRequest] = useState<RepairRequest | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [technicians, setTechnicians] = useState<{[key: string]: string}>({}) // Map of technician ID to name
  const [notification, setNotification] = useState<{
    show: boolean
    type: "success" | "error" | "info"
    message: string
  }>({ show: false, type: "info", message: "" })


  useEffect(() => {
    // ตรวจสอบสิทธิ์ผู้ใช้จาก localStorage
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      router.push("/");
      return;
    }
    const user = JSON.parse(userStr);
    setCurrentUser(user);
    if (user.type_id !== "01") {
      router.push("/");
      return;
    }
    // ให้ useEffect เรียกฟังก์ชัน fetch ที่อยู่ภายนอก เพื่อให้สามารถเรียกซ้ำได้จากที่อื่น
    fetchRequests();
    fetchTechnicians();
  }, [router]);

  // ดึงข้อมูลจาก API (แยกเป็นฟังก์ชันให้อยู่ scope ของ component)
  async function fetchRequests() {
    try {
      const res = await fetch("/api/repair-requests");
      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลงานซ่อมได้");
      const allRequests = await res.json();
      setRequests(allRequests);
    } catch (e) {
      console.error('fetchRequests error', e);
      setRequests([]);
    }
  }

  async function fetchTechnicians() {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const users = await res.json();
        const techMap: {[key: string]: string} = {};
        users.forEach((user: any) => {
          if (user.type_id === "02") { // เฉพาะช่างเทคนิค
            techMap[user.user_id] = user.name;
          }
        });
        setTechnicians(techMap);
      }
    } catch (error) {
      console.error("ไม่สามารถดึงข้อมูลช่างได้:", error);
    }
  }

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ show: true, type, message })
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    showNotification("success", "ออกจากระบบสำเร็จ");
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  // ฟังก์ชันแสดงชื่อช่างจาก ID
  const getTechnicianName = (assignedTo: string | undefined) => {
    if (!assignedTo) return "-";
    const name = technicians[assignedTo];
    return name ? name : `ID: ${assignedTo}`;
  }

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            รอมอบหมาย
          </Badge>
        )
      case "assigned":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            มอบหมายแล้ว
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            กำลังซ่อม
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            เสร็จสิ้น
          </Badge>
        )
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const getPriorityBadge = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            สูง
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
            ปานกลาง
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">
            ต่ำ
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            ไม่ระบุ
          </Badge>
        )
    }
  }

  const filteredRequests = requests.filter((request) => {
    const q = searchTerm.toLowerCase()
    
    // ค้นหาตามชื่อช่าง (ID และชื่อ)
    const technicianName = technicians[request.assignedTo || ""] || ""
    const technicianMatch = 
      (request.assignedTo || "").toLowerCase().includes(q) || // ค้นหาตาม ID
      technicianName.toLowerCase().includes(q) // ค้นหาตามชื่อ
    
    const matchesSearch =
      (request.equipmentName || "").toLowerCase().includes(q) ||
      (request.equipmentCode || "").toLowerCase().includes(q) ||
      (request.reporter || "").toLowerCase().includes(q) ||
      ((request.location?.building || "") + " " + (request.location?.room || "")).toLowerCase().includes(q) ||
      technicianMatch
      
    const matchesStatus = statusFilter === "all" || (request.status || "") === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress" || r.status === "assigned").length,
    completed: requests.filter((r) => r.status === "completed").length,
  }

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("คุณต้องการลบรายการนี้หรือไม่?")) return;
    try {
      const headers: any = {};
      // Prefer currentUser from state, fallback to localStorage 'user' payload if needed
      let userId: string | null = null;
      if (currentUser && (currentUser.user_id || currentUser.userId || currentUser.id)) {
        userId = currentUser.user_id || currentUser.userId || currentUser.id;
      } else if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('user');
          if (raw) {
            const parsed = JSON.parse(raw);
            userId = parsed?.user_id || parsed?.userId || parsed?.id || null;
          }
        } catch (e) {
          console.warn('failed to parse localStorage.user', e);
        }
      }
      if (userId) headers['x-user-id'] = String(userId);

      const res = await fetch(`/api/repair-requests/${id}`, { method: 'DELETE', headers });
      let json: any = null;
      try { json = await res.json(); } catch (e) { /* ignore parse error */ }

      if (!res.ok || (json && json.success === false)) {
        console.error('delete failed', { status: res.status, body: json });
        const msg = (json && (json.message || json.error)) ? (json.message || json.error) : 'ไม่สามารถลบรายการได้';
        showNotification('error', msg);
        return;
      }

      // Refresh from server
      try { await fetchRequests(); } catch (e) { console.warn('refresh after delete failed', e); }

      // notify other windows/components
      try {
        if (typeof window !== 'undefined') {
          try { localStorage.setItem('repairRequestUpdated', String(Date.now())); } catch {}
          window.dispatchEvent(new CustomEvent('repairRequestUpdated'));
          try { localStorage.removeItem('repairRequestUpdated'); } catch {}
        }
      } catch (e) {
        console.warn('failed to dispatch repairRequestUpdated event', e);
      }

      const successMsg = (json && json.message) ? json.message : 'ลบรายการสำเร็จ';
      showNotification('success', successMsg);
    } catch (e) {
      console.error('delete error', e);
      showNotification('error', 'เกิดข้อผิดพลาดขณะลบรายการ');
    }
  }

  const handleUpdateStatus = (id: string, status: RepairRequest["status"], assignedTo?: string) => {
    const updates: Partial<RepairRequest> = { status }
    if (assignedTo) updates.assignedTo = assignedTo
    if (status === "completed") updates.completedDate = new Date().toISOString().split("T")[0]

  // Update in local state + persist
  const updated = requests.map((r) => (r.id === id ? { ...r, ...updates } : r))
  setRequests(updated)
  try { localStorage.setItem("requests", JSON.stringify(updated)) } catch {}
    showNotification("success", "อัปเดตสถานะสำเร็จ")
  }

  // Enhanced Mobile Filters Component
  const MobileFilters = () => (
    <div className="space-y-6">
      {/* User Info Section */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{currentUser?.name}</p>
            <p className="text-sm text-gray-600">ผู้ดูแลระบบ</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push("/")}
            className="flex-1 bg-white/80 border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Home className="w-4 h-4 mr-2" />
            หน้าหลัก
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="bg-white/80 border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">รายการทั้งหมด</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">รอมอบหมาย</span>
          </div>
          <p className="text-xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">กำลังดำเนินการ</span>
          </div>
          <p className="text-xl font-bold text-purple-900">{stats.inProgress}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">เสร็จสิ้น</span>
          </div>
          <p className="text-xl font-bold text-green-900">{stats.completed}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-gray-900">ค้นหาและกรอง</h3>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">ค้นหา</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ค้นหาครุภัณฑ์ รหัส หรือผู้แจ้ง..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">กรองตามสถานะ</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกสถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="pending">รอมอบหมาย</SelectItem>
              <SelectItem value="assigned">มอบหมายแล้ว</SelectItem>
              <SelectItem value="in-progress">กำลังซ่อม</SelectItem>
              <SelectItem value="completed">เสร็จสิ้น</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">การจัดการ</h3>
        </div>
        <div className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full justify-start bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setShowAddForm(true)
              setShowMobileFilters(false)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มรายการแจ้งซ่อม
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full justify-start bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => router.push("/map")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            ดูแผนผังครุภัณฑ์
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full justify-start bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => showNotification("info", "ฟีเจอร์รายงานกำลังพัฒนา")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            ดูรายงานสถิติ
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full justify-start bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => showNotification("info", "ฟีเจอร์การจัดการผู้ใช้กำลังพัฒนา")}
          >
            <Users className="w-4 h-4 mr-2" />
            จัดการผู้ใช้งาน
          </Button>
        </div>
      </div>

      {/* Priority Requests */}
      {requests.filter((r) => r.priority === "high" && r.status !== "completed").length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">รายการด่วน</h3>
          </div>
          <div className="space-y-2">
            {requests
              .filter((r) => r.priority === "high" && r.status !== "completed")
              .slice(0, 3)
              .map((request) => (
                <div key={request.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">{request.equipmentName}</p>
                  <p className="text-xs text-red-600">
                    {request.location.building} {request.location.room}
                  </p>
                  <p className="text-xs text-red-600">ผู้แจ้ง: {request.reporter}</p>
                  <div className="mt-2 flex gap-1">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">กิจกรรมล่าสุด</h3>
        </div>
        <div className="space-y-2">
          {requests
            .sort((a, b) => new Date(b.reportDate ?? "1970-01-01").getTime() - new Date(a.reportDate ?? "1970-01-01").getTime())
            .slice(0, 3)
            .map((request) => (
              <div key={request.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">{request.equipmentName}</p>
                <p className="text-xs text-blue-600">แจ้งเมื่อ: {request.reportDate}</p>
                <div className="mt-1">{getStatusBadge(request.status)}</div>
              </div>
            ))}
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
              {/* Enhanced Mobile Menu */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="sm:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
                    <SheetTitle className="flex items-center gap-2 text-orange-900">
                      <Filter className="w-5 h-5 text-orange-600" />
                      เมนูควบคุม
                    </SheetTitle>
                    <SheetDescription className="text-orange-700">ตัวกรอง ค้นหา และการจัดการระบบ</SheetDescription>
                  </SheetHeader>
                  <div className="p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                    <MobileFilters />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">ระบบจัดการแจ้งซ่อมครุภัณฑ์</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{currentUser?.name}</span>
                <Badge variant="outline" className="text-xs">
                  Admin
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
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-sm border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">รายการทั้งหมด</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">รายการ</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">รอมอบหมาย</CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">รายการ</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">กำลังดำเนินการ</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">รายการ</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">เสร็จสิ้น</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">รายการ</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="hidden sm:flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาครุภัณฑ์ รหัส ผู้แจ้ง หรือชื่อช่าง..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/95 backdrop-blur-sm border-gray-200"
              />
  
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-white/95 backdrop-blur-sm border-gray-200">
                <SelectValue placeholder="กรองตามสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="pending">รอมอบหมาย</SelectItem>
                <SelectItem value="assigned">มอบหมายแล้ว</SelectItem>
                <SelectItem value="in-progress">กำลังซ่อม</SelectItem>
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="text-sm">เพิ่มรายการแจ้งซ่อม</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>เพิ่มรายการแจ้งซ่อมใหม่</DialogTitle>
                  <DialogDescription>กรอกข้อมูลครุภัณฑ์และรายละเอียดการซ่อม</DialogDescription>
                </DialogHeader>
                <AddRepairForm
                  onClose={() => setShowAddForm(false)}
                  onSuccess={async () => {
                    try {
                      await fetchRequests()
                    } catch (e) {
                      console.warn('refresh after create failed', e)
                    }
                    showNotification("success", "เพิ่มรายการสำเร็จ")
                  }}
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => router.push("/map")}
              className="bg-white/95 backdrop-blur-sm border-gray-200"
            >
              <Package className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">ดูแผนผัง</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              รายการแจ้งซ่อมทั้งหมด
            </CardTitle>
            <CardDescription>จัดการและติดตามสถานะการซ่อมบำรุงครุภัณฑ์</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">รหัส</TableHead>
                    <TableHead className="text-xs sm:text-sm">ครุภัณฑ์</TableHead>
                    <TableHead className="hidden sm:table-cell text-xs sm:text-sm">สถานที่</TableHead>
                    <TableHead className="hidden md:table-cell text-xs sm:text-sm">ผู้แจ้ง</TableHead>
                    <TableHead className="hidden lg:table-cell text-xs sm:text-sm">วันที่แจ้ง</TableHead>
                    <TableHead className="text-xs sm:text-sm">ความสำคัญ</TableHead>
                    <TableHead className="text-xs sm:text-sm">สถานะ</TableHead>
                    <TableHead className="hidden xl:table-cell text-xs sm:text-sm">ช่างที่รับผิดชอบ</TableHead>
                    <TableHead className="text-xs sm:text-sm">การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-xs sm:text-sm">{request.id}</TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        <div>
                          <div className="font-medium line-clamp-1">{request.equipmentName}</div>
                          <div className="text-xs text-gray-500">{request.equipmentCode}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">
                            {request.location.building} {request.location.floor} {request.location.room}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs sm:text-sm">{request.reporter}</TableCell>
                      <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{request.reportDate}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="hidden xl:table-cell text-xs sm:text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {request.assignedTo ? getTechnicianName(request.assignedTo) : "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>รายละเอียดงานซ่อม #{request.id}</DialogTitle>
                              </DialogHeader>
                              <ViewRequestDialog request={request} onUpdateStatus={handleUpdateStatus} technicians={technicians} />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setEditingRequest(request)}
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบรายการแจ้งซ่อม</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all" ? "ไม่มีรายการที่ตรงกับเงื่อนไขการค้นหา" : "ยังไม่มีรายการแจ้งซ่อมในระบบ"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
      {editingRequest && (
        <Dialog open={!!editingRequest} onOpenChange={(open) => { if (!open) setEditingRequest(null) }}>
          <DialogContent className="max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการแจ้งซ่อม #{editingRequest.id}</DialogTitle>
            </DialogHeader>
            <EditRequestDialog
              request={editingRequest}
              onClose={() => setEditingRequest(null)}
              onSaved={async () => { await fetchRequests(); showNotification('success', 'บันทึกการแก้ไขสำเร็จ') }}
              technicians={technicians}
              currentUser={currentUser}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

    // Using shared AddRepairForm from components/admin/AddRepairForm.tsx

    function ViewRequestDialog({
  request,
  onUpdateStatus,
  technicians,
}: {
  request: RepairRequest
  onUpdateStatus: (id: string, status: RepairRequest["status"], assignedTo?: string) => void
  technicians: { [key: string]: string }
}) {
  // Prefer room-assigned technician if available, otherwise use request.assignedTo
  const initialAssigned = request.roomAssignedTechnician || request.assignedTo || "none"
  const [assignedTo, setAssignedTo] = useState<string>(initialAssigned)
  const [selectedStatus, setSelectedStatus] = useState<RepairRequest["status"] | undefined>(request.status)

  const handleStatusUpdate = (status: RepairRequest["status"]) => {
    setSelectedStatus(status)
    onUpdateStatus(request.id, status, assignedTo === "none" ? undefined : assignedTo)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">ครุภัณฑ์</Label>
          <p className="text-sm font-semibold">{request.equipmentName}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">รหัส</Label>
          <p className="text-sm font-semibold">{request.equipmentCode}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">สถานที่</Label>
          <p className="text-sm">
            {request.location.building} {request.location.floor} {request.location.room}
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium">ผู้แจ้ง</Label>
          <p className="text-sm">{request.reporter}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">รายละเอียดปัญหา</Label>
        <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-700">{request.description}</p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label className="text-sm font-medium">หมายเหตุ (Notes)</Label>
        <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-700">{request.notes || '-'}</p>
        </div>
      </div>

      {/* Images */}
      <div>
        <Label className="text-sm font-medium">ภาพหลักฐาน</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {(request.images || []).length === 0 && <p className="text-sm text-gray-500">ไม่มีภาพ</p>}
          {((request.images || []) as string[]).map((rawImg: string, idx: number) => {
            // normalize to absolute path or keep data/http URIs
            let img = String(rawImg || '').trim()
            if (!img) return null
            if (img.startsWith('data:') || img.startsWith('http') || img.startsWith('/')) {
              // keep as-is
            } else {
              // ensure /uploads/ prefix for bare filenames
              img = `/uploads/${img.replace(/^\/+/, '')}`
            }
            return (
              <a key={idx} href={img} target="_blank" rel="noreferrer" className="inline-block">
                <img src={img} alt={`evidence-${idx}`} className="w-24 h-24 object-cover rounded border" />
              </a>
            )
          })}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">มอบหมายให้ช่าง</Label>
        <Select value={assignedTo} onValueChange={setAssignedTo}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกช่าง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">ไม่มอบหมาย</SelectItem>
            {Object.entries(technicians).map(([id, name]) => (
              <SelectItem key={id} value={id}>{name || id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">อัปเดตสถานะ</Label>
        <p className="text-xs text-gray-600 mb-2">สถานะปัจจุบัน: {selectedStatus || request.status || 'ไม่ทราบ'}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusUpdate("assigned")}
            disabled={assignedTo === "none"}
            className={`bg-transparent ${selectedStatus === 'assigned' ? 'ring-2 ring-offset-1 ring-blue-200' : ''}`}
          >
            มอบหมายงาน
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusUpdate("in-progress")}
            className={`text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent ${selectedStatus === 'in-progress' ? 'ring-2 ring-offset-1 ring-purple-200' : ''}`}
          >
            กำลังซ่อม
          </Button>
          <Button
            size="sm"
            onClick={() => handleStatusUpdate("completed")}
            className={`bg-green-600 hover:bg-green-700 text-white ${selectedStatus === 'completed' ? 'opacity-90' : ''}`}
          >
            เสร็จสิ้น
          </Button>
        </div>
      </div>
    </div>
  )
}

// Edit dialog component for admins to modify a repair request
function EditRequestDialog({
  request,
  onClose,
  onSaved,
  technicians,
  currentUser,
}: {
  request: RepairRequest
  onClose: () => void
  onSaved: () => void
  technicians: { [key: string]: string }
  currentUser: any
}) {
  const [description, setDescription] = useState(request.description || "")
  const [priority, setPriority] = useState<"low" | "medium" | "high">((request.priority as any) || "medium")
  const [assignedTo, setAssignedTo] = useState<string>(request.assignedTo || "none")
  const [status, setStatus] = useState<string>(request.status || "pending")
  const [saving, setSaving] = useState(false)
  const [equipmentName, setEquipmentName] = useState<string>(request.equipmentName || "")
  const [equipmentCode, setEquipmentCode] = useState<string>(request.equipmentCode || "")
  const [building, setBuilding] = useState<string>((request.location && request.location.building) || "")
  const [floor, setFloor] = useState<string>((request.location && request.location.floor) || "")
  const [room, setRoom] = useState<string>((request.location && request.location.room) || "")
  const [reporter, setReporter] = useState<string>(request.reporter || "")

  const handleSave = async () => {
    setSaving(true)
    try {
  const payload: any = { description, priority, status }
      if (assignedTo && assignedTo !== "none") payload.assignedTo = assignedTo
      const changedBy = currentUser?.user_id || currentUser?.userId || currentUser?.id || currentUser?.name || null
      if (changedBy) payload.changedBy = changedBy
  // include editable equipment/location fields
  if (equipmentName !== undefined) payload.equipment_name = equipmentName
  if (equipmentCode !== undefined) payload.equipment_code = equipmentCode
  if (building !== undefined) payload.building = building
  if (floor !== undefined) payload.floor = floor
  if (room !== undefined) payload.room = room
  if (reporter !== undefined) payload.reporter = reporter

      console.debug('[EditRequestDialog] PATCH payload:', payload)
      const res = await fetch(`/api/repair-requests/${encodeURIComponent(String(request.id))}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (res.ok) {
        try {
          window.dispatchEvent(new CustomEvent('repairRequestUpdated', { detail: { id: request.id, status } }))
          try { localStorage.setItem('repairRequestUpdated', JSON.stringify({ id: request.id, status, ts: Date.now() })) } catch (e) {}
          setTimeout(() => { try { localStorage.removeItem('repairRequestUpdated') } catch (e) {} }, 1000)
        } catch (e) {}
        // ensure parent refresh completes before closing the dialog to avoid stale UI
        try {
          if (onSaved) {
            const maybePromise = onSaved()
            // only await if it's a Promise-like object with a then function
            if (maybePromise !== undefined && maybePromise !== null && typeof (maybePromise as any).then === 'function') {
              await (maybePromise as any)
            }
          }
        } catch (e) {
          console.warn('[EditRequestDialog] onSaved handler failed', e)
        }
        onClose()
      } else {
        alert(json?.message || json?.error || 'ไม่สามารถบันทึกการเปลี่ยนแปลงได้')
      }
    } catch (e) {
      console.error('save edit error', e)
      alert('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">ชื่อครุภัณฑ์</Label>
          <Input value={equipmentName} onChange={(e) => setEquipmentName(e.target.value)} className="mt-2" />
        </div>
        <div>
          <Label className="text-sm font-medium">รหัสครุภัณฑ์</Label>
          <Input value={equipmentCode} onChange={(e) => setEquipmentCode(e.target.value)} className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">อาคาร</Label>
          <Input value={building} onChange={(e) => setBuilding(e.target.value)} className="mt-2" />
        </div>
        <div>
          <Label className="text-sm font-medium">ชั้น</Label>
          <Input value={floor} onChange={(e) => setFloor(e.target.value)} className="mt-2" />
        </div>
        <div>
          <Label className="text-sm font-medium">ห้อง</Label>
          <Input value={room} onChange={(e) => setRoom(e.target.value)} className="mt-2" />
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">ผู้แจ้ง</Label>
        <Input value={reporter} onChange={(e) => setReporter(e.target.value)} className="mt-2" />
      </div>
      <div>
        <Label className="text-sm font-medium">รายละเอียดปัญหา</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-2" />
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">ความสำคัญ</Label>
        <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="high">สูง</SelectItem>
            <SelectItem value="medium">ปานกลาง</SelectItem>
            <SelectItem value="low">ต่ำ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">มอบหมายให้ช่าง</Label>
        <Select value={assignedTo} onValueChange={setAssignedTo}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">ไม่มอบหมาย</SelectItem>
            {Object.entries(technicians).map(([id, name]) => (
              <SelectItem key={id} value={id}>{name || id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium mb-2 block">สถานะ</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">รอมอบหมาย</SelectItem>
            <SelectItem value="assigned">มอบหมายแล้ว</SelectItem>
            <SelectItem value="in-progress">กำลังซ่อม</SelectItem>
            <SelectItem value="completed">เสร็จสิ้น</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-orange-500 to-amber-500">บันทึก</Button>
      </div>
    </div>
  )
}


