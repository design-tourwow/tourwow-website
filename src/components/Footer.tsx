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
            <h4 className="text-lg font-semibold mb-4 text-white">การบ้าน</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {/* Template 1 */}
              <div>
                <h5 className="text-emerald-200 font-semibold mb-2">Template 1</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tours-new" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 1
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-new" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 1
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 2 */}
              <div>
                <h5 className="text-sky-200 font-semibold mb-2">Template 2</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tours-clean" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 2
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-clean" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 2
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 3 */}
              <div>
                <h5 className="text-pink-200 font-semibold mb-2">Template 3</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tours-vibrant" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 3
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-vibrant" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 3
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 4 */}
              <div>
                <h5 className="text-amber-200 font-semibold mb-2">Template 4</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-4" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 4
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-4" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 4
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 5 */}
              <div>
                <h5 className="text-orange-200 font-semibold mb-2">Template 5</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-5" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 5
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-5" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 5
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 6 */}
              <div>
                <h5 className="text-purple-200 font-semibold mb-2">Template 6</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-6" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 6
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-6" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 6
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 7 */}
              <div>
                <h5 className="text-teal-200 font-semibold mb-2">Template 7</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-7" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 7
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-7" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 7
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 8 */}
              <div>
                <h5 className="text-cyan-200 font-semibold mb-2">Template 8</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-8" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 8
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-8" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 8
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 9 */}
              <div>
                <h5 className="text-lime-200 font-semibold mb-2">Template 9</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-9" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 9
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-9" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 9
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 10 */}
              <div>
                <h5 className="text-rose-200 font-semibold mb-2">Template 10</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-10" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 10
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-10" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 10
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 11 */}
              <div>
                <h5 className="text-violet-200 font-semibold mb-2">Template 11</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-11" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 11
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-11" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 11
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 12 */}
              <div>
                <h5 className="text-emerald-300 font-semibold mb-2">Template 12</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-12" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 12
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-12" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 12
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 13 */}
              <div>
                <h5 className="text-indigo-300 font-semibold mb-2">Template 13</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-13" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 13
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-13" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 13
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 14 */}
              <div>
                <h5 className="text-pink-300 font-semibold mb-2">Template 14</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-14" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 14
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-14" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 14
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 15 */}
              <div>
                <h5 className="text-yellow-300 font-semibold mb-2">Template 15</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-15" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 15
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-15" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 15
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 16 */}
              <div>
                <h5 className="text-blue-300 font-semibold mb-2">Template 16</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-16" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 16
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-16" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 16
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 17 */}
              <div>
                <h5 className="text-green-300 font-semibold mb-2">Template 17</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-17" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 17
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-17" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 17
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Template 18 */}
              <div>
                <h5 className="text-red-300 font-semibold mb-2">Template 18</h5>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tour-search-18" className="text-blue-100 hover:text-white transition-colors">
                      Tour search 18
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-18" className="text-blue-100 hover:text-white transition-colors">
                      Blog list 18
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

            {/* Other menus */}
            <div className="mt-6">
              <h5 className="text-white font-semibold mb-2">เมนูอื่น</h5>
              <ul className="flex flex-wrap gap-3">
                <li>
                  <Link href="/flash-sale" className="flex items-center gap-1 text-red-200 hover:text-white transition-colors">
                    <span role="img" aria-label="ทัวร์ไฟไหม้">🔥</span> ทัวร์ไฟไหม้
                  </Link>
                </li>
                <li>
                  <Link href="/api-tours" className="flex items-center gap-1 text-indigo-200 hover:text-white transition-colors">
                    <span role="img" aria-label="ทัวร์ API">🧩</span> ทัวร์ API
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale-tours" className="flex items-center gap-1 text-purple-200 hover:text-white transition-colors">
                    <span role="img" aria-label="Wholesale Tours">🏷️</span> Wholesale Tours
                  </Link>
                </li>
                <li>
                  <Link href="/api-test" className="flex items-center gap-1 text-green-200 hover:text-white transition-colors">
                    <span role="img" aria-label="API Test">🧪</span> API Test
                  </Link>
                </li>
              </ul>
            </div>
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