import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">TourWow</h3>
            <p className="text-blue-100 mb-4">
              แพลตฟอร์มจองทัวร์ออนไลน์ที่ครอบคลุมทั้งในและต่างประเทศ 
              พร้อมตัวเลือกทัวร์กว่า 2,000 โปรแกรมไปทั่วโลกกว่า 100 ประเทศ
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">เมนูหลัก</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-blue-100 hover:text-white transition-colors">
                  ทัวร์
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-blue-100 hover:text-white transition-colors">
                  จุดหมายปลายทาง
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">บริการลูกค้า</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tourwow-blog" className="text-blue-100 hover:text-white transition-colors">
                  📝 บล็อก
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  นโยบายการจอง
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  นโยบายการยกเลิก
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  เงื่อนไขและข้อตกลง
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ข้อมูลติดต่อ</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-200" />
                <span className="text-blue-100">02-674-1500</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-200" />
                <span className="text-blue-100">info@tourwow.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-200" />
                <span className="text-blue-100">
                  507/517 ถนนสาธุประดิษฐ์<br />
                  แขวงช่องนนทรี เขตยานนาวา<br />
                  กรุงเทพมหานคร 10120
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © 2024 TourWow. สงวนลิขสิทธิ์ทั้งหมด | ใบอนุญาตธุรกิจนำเที่ยว เลขที่ 11/09058
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/contact" className="text-blue-200 hover:text-white text-sm transition-colors">
                ข้อกำหนดการใช้บริการ
              </Link>
              <Link href="/contact" className="text-blue-200 hover:text-white text-sm transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/tourwow-blog" className="text-blue-200 hover:text-white text-sm transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}