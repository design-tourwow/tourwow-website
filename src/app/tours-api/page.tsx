"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Clock, Users, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import TourFilterSidebar from "@/components/TourFilterSidebar";
import { Button } from "@/components/ui/Button";

const API_URL = "https://www.zegoapi.com/v1.5/programtours";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk";

function formatPrice(price: any) {
  if (!price || isNaN(price)) return "-";
  return Number(price).toLocaleString();
}

function formatDate(date: string) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
}

export default function ToursApiPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("ทั้งหมด");
  const [category, setCategory] = useState("ทั้งหมด");
  const [price, setPrice] = useState("ทั้งหมด");
  const [days, setDays] = useState("ทั้งหมด");
  const [showFilter, setShowFilter] = useState(false);
  const [showDetail, setShowDetail] = useState<any>(null);
  const [displayed, setDisplayed] = useState(16);
  const perPage = 16;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      headers: { "auth-token": AUTH_TOKEN }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error: " + res.status);
        const data = await res.json();
        setTours(Array.isArray(data) ? data : data.data || []);
      })
      .catch((e) => setError(e.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoading(false));
  }, []);

  // Filter options
  const countryList = useMemo(() => ["ทั้งหมด", ...Array.from(new Set(tours.map(t => t.CountryName).filter(Boolean)))], [tours]);
  const categoryList = useMemo(() => ["ทั้งหมด", ...Array.from(new Set(tours.map(t => t.CategoryName).filter(Boolean)))], [tours]);
  const daysList = useMemo(() => ["ทั้งหมด", ...Array.from(new Set(tours.map(t => t.Days).filter(Boolean)))], [tours]);
  const priceList = ["ทั้งหมด", "ต่ำกว่า 15000", "15000-25000", "25000-35000", "35000-50000", "มากกว่า 50000"];

  // Filtering
  const filtered = useMemo(() => {
    return tours.filter(t => {
      const matchSearch = search === "" || (t.ProductName || "").toLowerCase().includes(search.toLowerCase()) || (t.CountryName || "").toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === "ทั้งหมด" || t.CountryName === country;
      const matchCategory = category === "ทั้งหมด" || t.CategoryName === category;
      const matchDays = days === "ทั้งหมด" || String(t.Days) === String(days);
      let matchPrice = true;
      if (price !== "ทั้งหมด" && t.Periods && t.Periods[0] && t.Periods[0].Price) {
        const p = Number(t.Periods[0].Price);
        if (price === "ต่ำกว่า 15000") matchPrice = p < 15000;
        else if (price === "15000-25000") matchPrice = p >= 15000 && p <= 25000;
        else if (price === "25000-35000") matchPrice = p > 25000 && p <= 35000;
        else if (price === "35000-50000") matchPrice = p > 35000 && p <= 50000;
        else if (price === "มากกว่า 50000") matchPrice = p > 50000;
      }
      return matchSearch && matchCountry && matchCategory && matchDays && matchPrice;
    });
  }, [tours, search, country, category, days, price]);

  // Modal detail
  function TourDetailModal({ tour, onClose }: { tour: any, onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
          <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500" onClick={onClose}><X className="w-6 h-6" /></button>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/2 h-48 md:h-60">
              <Image src={tour.URLImage || "/plane.svg"} alt={tour.ProductName || "Tour Image"} fill className="object-cover rounded-lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{tour.ProductName}</h2>
              <div className="text-blue-700 mb-2">{tour.CountryName} {tour.Locations && `| ${Array.isArray(tour.Locations) ? tour.Locations.join(', ') : tour.Locations}`}</div>
              <div className="flex gap-4 text-sm text-gray-600 mb-2">
                <span><Clock className="inline w-4 h-4 mr-1" />{tour.Days} วัน</span>
                <span><Users className="inline w-4 h-4 mr-1" />{tour.Periods && tour.Periods[0] && tour.Periods[0].Seat ? `ที่นั่งว่าง ${tour.Periods[0].Seat}` : '-'}</span>
                <span>{tour.AirlineName && `✈️ ${tour.AirlineName}`}</span>
              </div>
              <div className="text-lg font-bold text-blue-900 mb-2">ราคาเริ่มต้น ฿{tour.Periods && tour.Periods[0] && formatPrice(tour.Periods[0].Price)}</div>
              {tour.Highlight && <div className="bg-blue-50 rounded p-3 text-sm mb-2 whitespace-pre-line">{tour.Highlight}</div>}
              {tour.FilePDF && <a href={tour.FilePDF} target="_blank" rel="noopener" className="text-blue-600 underline text-sm">ดาวน์โหลดโปรแกรม PDF</a>}
            </div>
          </div>
          {tour.Itinerary && Array.isArray(tour.Itinerary) && (
            <div className="mt-6">
              <h3 className="font-bold text-blue-800 mb-2">กำหนดการเดินทาง</h3>
              <ol className="list-decimal ml-6 space-y-1 text-sm">
                {tour.Itinerary.map((it: any) => (
                  <li key={it.ItinID}><span className="font-semibold">วันที่ {it.ItinDay}:</span> {it.ItinDes}</li>
                ))}
              </ol>
            </div>
          )}
          {tour.Periods && Array.isArray(tour.Periods) && (
            <div className="mt-6">
              <h3 className="font-bold text-blue-800 mb-2">รอบเดินทาง & ราคา</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-blue-100 text-blue-900">
                      <th className="px-2 py-1 border">วันเดินทาง</th>
                      <th className="px-2 py-1 border">ราคา</th>
                      <th className="px-2 py-1 border">ที่นั่งว่าง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tour.Periods.map((p: any, i: number) => (
                      <tr key={i} className="even:bg-blue-50">
                        <td className="px-2 py-1 border">{formatDate(p.DateGo)}</td>
                        <td className="px-2 py-1 border">฿{formatPrice(p.Price)}</td>
                        <td className="px-2 py-1 border">{p.Seat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">โปรแกรมทัวร์ต่างประเทศ (API)</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์ ชื่อ เมือง ประเทศ..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-900"
                  aria-label="ค้นหาทัวร์"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilter(v => !v)}
                className="md:hidden flex items-center gap-2"
              >
                {showFilter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                ตัวกรอง
              </Button>
            </div>
            <div className={`transition-all duration-300 ${showFilter ? 'block' : 'hidden'} md:block`}>
              <TourFilterSidebar
                categories={categoryList}
                selectedCategory={category}
                onCategoryChange={setCategory}
                priceRanges={priceList}
                selectedPriceRange={price}
                onPriceChange={setPrice}
                sortOptions={['ยอดนิยม']}
                selectedSortBy={'ยอดนิยม'}
                onSortByChange={() => {}}
                countries={countryList.map(name => ({ name, count: tours.filter(t => t.CountryName === name).length }))}
                selectedCountry={country}
                onCountryChange={setCountry}
                onClearFilters={() => {
                  setCountry('ทั้งหมด');
                  setCategory('ทั้งหมด');
                  setPrice('ทั้งหมด');
                  setDays('ทั้งหมด');
                  setSearch('');
                }}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            <span className="ml-4 text-blue-700 font-medium">กำลังโหลดข้อมูลทัวร์...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-600 font-semibold">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-blue-700">
            <Search className="w-10 h-10 mb-2" />
            <div className="text-xl font-semibold">ไม่พบโปรแกรมทัวร์</div>
            <div className="text-sm">ลองเปลี่ยนคำค้นหาหรือรีเซ็ตตัวกรอง</div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, displayed).map((tour) => (
                <div
                  key={tour.ProductID}
                  className="group bg-white rounded-2xl border border-blue-100 shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  onClick={() => setShowDetail(tour)}
                >
                  <div className="relative h-44">
                    <Image
                      src={tour.URLImage || "/plane.svg"}
                      alt={tour.ProductName || "Tour Image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {tour.CountryName && (
                      <div className="absolute top-0 left-0 text-white px-3 py-1.5 rounded-br-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                        {tour.CountryName}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-base font-bold text-blue-900 mb-1 line-clamp-2">{tour.ProductName || '-'}</h2>
                    <div className="flex items-center text-gray-500 mb-1 text-xs">
                      <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                      <span>{Array.isArray(tour.Locations) && tour.Locations.length > 0 ? tour.Locations.join(', ') : 'ไม่ระบุ'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2 border-t border-b border-gray-100 py-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                        <span>{tour.Days ? `${tour.Days} วัน` : '-'} </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                        <span>{tour.Periods && Array.isArray(tour.Periods) && tour.Periods[0] && typeof tour.Periods[0].Seat !== 'undefined' ? `ที่นั่งว่าง ${tour.Periods[0].Seat}` : '-'}</span>
                      </div>
                    </div>
                    <div className="mt-auto text-right">
                      <div className="text-lg font-bold text-blue-900">
                        ฿{tour.Periods && Array.isArray(tour.Periods) && tour.Periods[0] && typeof tour.Periods[0].Price !== 'undefined' ? tour.Periods[0].Price.toLocaleString() : '-'} <span className="text-xs font-normal text-gray-500">/ต่อท่าน</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {displayed < filtered.length && (
              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  onClick={() => setDisplayed((prev) => prev + perPage)}
                  size="lg"
                  className="px-8 py-3 text-blue-600 hover:bg-blue-50"
                >
                  แสดงเพิ่มเติม
                </Button>
              </div>
            )}
          </>
        )}
        {showDetail && <TourDetailModal tour={showDetail} onClose={() => setShowDetail(null)} />}
      </div>
    </main>
  );
} 