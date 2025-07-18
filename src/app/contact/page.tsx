'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle, MessageCircle, Facebook } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (submitStatus) setSubmitStatus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <main className="bg-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1587560699334-cc4262401233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Contact Us"
                fill
                className="object-cover opacity-20"
              />
          </div>
          <div className="relative container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">ติดต่อเรา</h1>
            <p className="text-lg md:text-xl text-blue-100">เราพร้อมให้บริการและตอบทุกข้อสงสัยของคุณ</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
            {/* Contact Information */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">ข้อมูลการติดต่อ</h2>
                <p className="text-gray-600 mb-8">
                  คุณสามารถติดต่อเราผ่านช่องทางด้านล่างนี้ได้ทันที เรายินดีให้ความช่วยเหลือในทุกเรื่องเกี่ยวกับการเดินทางของคุณ
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Phone />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">เบอร์โทรศัพท์</h3>
                      <p className="text-gray-600 text-xl font-bold text-blue-600">02-674-1500</p>
                      <p className="text-gray-500 text-sm">สายตรง (เวลาทำการ)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Mail />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">อีเมล</h3>
                      <p className="text-gray-600 break-all">info@tourwow.com</p>
                      <p className="text-gray-500 text-sm">ตอบกลับภายใน 24 ชั่วโมง</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <MapPin />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">ที่อยู่บริษัท</h3>
                      <p className="text-gray-600 leading-relaxed">
                        <strong>บริษัท ทัวร์ว้าว จำกัด</strong><br />
                        507/517 ถนนสาธุประดิษฐ์<br />
                        แขวงช่องนนทรี เขตยานนาวา<br />
                        กรุงเทพมหานคร 10120<br />
                        <span className="text-blue-600 font-semibold">ใบอนุญาต: 11/09058</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">ติดตามเราได้ที่</h3>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/tourwow.official" target="_blank" rel="noopener noreferrer" 
                       className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://line.me/ti/p/@tourwow" target="_blank" rel="noopener noreferrer"
                       className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Line ID:</strong> @tourwow</p>
                    <p><strong>Facebook:</strong> Tourwow Official</p>
                    <p><strong>TikTok:</strong> @tourwow_official</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-sm text-gray-500">
                <p><strong>เวลาทำการ:</strong> จันทร์ - ศุกร์, 9:00 - 18:00 น.</p>
                <p><strong>วันหยุด:</strong> เสาร์ - อาทิตย์ และวันหยุดนักขัตฤกษ์</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">ส่งข้อความถึงเรา</h2>
               {submitStatus === 'success' && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <strong className="font-bold">ส่งข้อความสำเร็จ!</strong>
                    <p>ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด</p>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  <div>
                    <strong className="font-bold">เกิดข้อผิดพลาด!</strong>
                    <p>ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง</p>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    placeholder="กรอกชื่อ-นามสกุลของคุณ"
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">อีเมล</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    placeholder="กรอกอีเมลที่ติดต่อได้"
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">ข้อความ</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    rows={5} 
                    placeholder="คุณมีอะไรให้เราช่วยเหลือ?"
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full"
                >
                  <Send className="w-5 h-5 mr-2"/>
                  {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Interactive Google Map */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">แผนที่ที่ตั้งสำนักงาน</h2>
                <p className="text-gray-600 text-center mb-8">
                  507/517 ถนนสาธุประดิษฐ์ แขวงช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120
                </p>
              </div>
              <div className="h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0649344942387!2d100.5353!3d13.6784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a14e1ea1db47%3A0x6f1a16b2b8c4f21e!2z4LiX4Lia4Lie4Lix4LiZ4LiY4Lix4Lii4Lib4LiC4LmA4LiW4Liz4LmA4Lil4Lit4LiB4LiI4Li04LiU!5e0!3m2!1sth!2sth!4v1689851234567!5m2!1sth!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่ที่ตั้งสำนักงาน TourWow"
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg text-gray-800">บริษัท ทัวร์ว้าว จำกัด</h3>
                    <p className="text-gray-600">507/517 ถนนสาธุประดิษฐ์ แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120</p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="https://maps.google.com/maps?q=13.6784,100.5353"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      เปิดใน Google Maps
                    </a>
                    <a
                      href="https://maps.google.com/maps/dir//13.6784,100.5353"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      นำทาง
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default function ContactPage() {
  return <ContactContent />;
}