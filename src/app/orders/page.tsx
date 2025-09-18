"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Calendar, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Search, Edit, Eye, Users, Globe, DollarSign, Plane, Package } from 'lucide-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/auth/login");
      return;
    }
    fetch("/api/tw-order", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");
        setOrders(data.orders);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    let filtered = orders;
    if (searchTerm) {
      filtered = filtered.filter(order =>
        (order.customer_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.tour_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toString().includes(searchTerm) ||
        (order.customer_phone || "").includes(searchTerm)
      );
    }
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    setFilteredOrders(filtered);
  }, [orders, searchTerm, sortOrder]);

  const getStatusConfig = (status: string) => {
    switch ((status || '').toLowerCase()) {
      case 'pending':
        return { text: 'รอดำเนินการ', icon: <Clock className="w-4 h-4" />, bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' };
      case 'confirmed':
        return { text: 'ยืนยันแล้ว', icon: <CheckCircle className="w-4 h-4" />, bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' };
      case 'cancelled':
        return { text: 'ยกเลิกแล้ว', icon: <XCircle className="w-4 h-4" />, bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' };
      default:
        return { text: status, icon: <AlertCircle className="w-4 h-4" />, bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' };
    }
  };

  const formatDate = (order: any) => {
    const d = order.created_at_ts
      ? dayjs.utc(order.created_at_ts)
      : order.created_at
      ? dayjs.utc(order.created_at)
      : null;
    return d ? d.tz('Asia/Bangkok').format('D MMM YYYY') : '';
  };
  const formatDateTime = (order: any) => {
    const d = order.created_at_ts
      ? dayjs.utc(order.created_at_ts)
      : order.created_at
      ? dayjs.utc(order.created_at)
      : null;
    return d ? d.tz('Asia/Bangkok').format('D MMM YYYY HH:mm') : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-center text-gray-600 font-medium">กำลังโหลดข้อมูลการจอง...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">ลองอีกครั้ง</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                การจองของฉัน
              </h1>
              <p className="text-gray-600 mt-1">ดูและจัดการรายการจองทัวร์ของคุณ</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อ, ทัวร์, หมายเลขจอง, เบอร์โทร..."
                  className="outline-none border-none bg-transparent w-40 sm:w-56"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="newest">ใหม่ &gt; เก่า</option>
                <option value="oldest">เก่า &gt; ใหม่</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchTerm ? 'ไม่พบรายการที่ตรงกับการค้นหา' : 'ยังไม่มีการจองใดๆ'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'ลองปรับเปลี่ยนคำค้นหา' : 'เมื่อมีการจองเข้ามา จะแสดงข้อมูลที่นี่'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status)
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          #{order.id}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {order.customer_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            จองเมื่อ {formatDateTime(order)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3 lg:mt-0">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border`}>
                          {statusConfig.icon}
                          {statusConfig.text}
                        </div>
                        {/* View Button */}
                        <button
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="ดูรายละเอียด"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {/* Tour Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Plane className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">{order.tour_name}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                  <span>เดินทางวันที่: {formatDate(order)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                  <span>กลับ: {formatDate(order)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                                  <span>ผู้เดินทาง: {order.traveler_count} คน</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Globe className="w-4 h-4 mr-2 text-blue-500" />
                                  <span>Period ID: {order.period_id}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 h-full">
                          <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-gray-900">ข้อมูลราคา</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">ราคาต่อคน:</span>
                              <span className="font-semibold">฿{Number(order.price_per_person).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">ยอดรวม:</span>
                              <span className="font-bold text-lg">฿{Number(order.total_amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t border-green-200 pt-2">
                              <span className="text-gray-600">มัดจำ:</span>
                              <span className="font-semibold text-green-600">฿{Number(order.deposit_amount).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{order.customer_phone}</span>
                        </div>
                        {order.customer_email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{order.customer_email}</span>
                          </div>
                        )}
                        {order.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">
                              {order.address}
                              {order.sub_district && ` ตำบล/แขวง${order.sub_district}`}
                              {order.district && ` อำเภอ/เขต${order.district}`}
                              {order.province && ` จังหวัด${order.province}`}
                              {order.postal_code && ` ${order.postal_code}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                รายละเอียดการจอง #{selectedOrder.id?.toString().padStart(4, '0')}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  ข้อมูลลูกค้า
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div><span className="text-gray-600">ชื่อ:</span> <span className="font-medium">{selectedOrder.customer_name}</span></div>
                  <div><span className="text-gray-600">โทรศัพท์:</span> <span className="font-medium">{selectedOrder.customer_phone}</span></div>
                  {selectedOrder.customer_email && (
                    <div><span className="text-gray-600">อีเมล:</span> <span className="font-medium">{selectedOrder.customer_email}</span></div>
                  )}
                </div>
              </div>
              {/* Address Details */}
              {selectedOrder.address && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    ที่อยู่จัดส่ง
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedOrder.address}</p>
                    <p className="text-gray-600 mt-1">
                      {selectedOrder.sub_district && `ตำบล/แขวง ${selectedOrder.sub_district} `}
                      {selectedOrder.district && `อำเภอ/เขต ${selectedOrder.district} `}
                      {selectedOrder.province && `จังหวัด ${selectedOrder.province} `}
                      {selectedOrder.postal_code && selectedOrder.postal_code}
                    </p>
                  </div>
                </div>
              )}
              {/* Tour Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-purple-600" />
                  รายละเอียดทัวร์
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div><span className="text-gray-600">ชื่อทัวร์:</span> <span className="font-medium">{selectedOrder.tour_name}</span></div>
                  <div><span className="text-gray-600">เดินทางวันที่:</span> <span className="font-medium">{formatDate(selectedOrder)}</span></div>
                  <div><span className="text-gray-600">วันกลับ:</span> <span className="font-medium">{formatDate(selectedOrder)}</span></div>
                  <div><span className="text-gray-600">จำนวนผู้เดินทาง:</span> <span className="font-medium">{selectedOrder.traveler_count} คน</span></div>
                  <div><span className="text-gray-600">Period ID:</span> <span className="font-medium">{selectedOrder.period_id}</span></div>
                  <div><span className="text-gray-600">Tour Program ID:</span> <span className="font-medium">{selectedOrder.tour_program_id}</span></div>
                </div>
              </div>
              {/* Price Breakdown */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  รายละเอียดราคา
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ราคาต่อคน:</span>
                    <span className="font-semibold">฿{Number(selectedOrder.price_per_person).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวนผู้เดินทาง:</span>
                    <span className="font-semibold">{selectedOrder.traveler_count} คน</span>
                  </div>
                  <div className="border-t border-green-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ยอดรวม:</span>
                      <span className="font-bold text-lg">฿{Number(selectedOrder.total_amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">มัดจำ (30%):</span>
                      <span className="font-bold text-green-600">฿{Number(selectedOrder.deposit_amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 