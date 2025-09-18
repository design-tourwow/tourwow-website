'use client';

import React, { useState } from 'react';
import { MapPin, Star, Clock, Heart } from 'lucide-react';

interface DemoCardProps {
  title: string;
  animationType: string;
  description: string;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, animationType, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [airplaneFlying, setAirplaneFlying] = useState(false);

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      if (animationType === 'map-journey') {
        setShowMapOverlay(true);
        // Start airplane animation immediately
        setTimeout(() => setAirplaneFlying(true), 100);
        // Hide map overlay after animation completes
        setTimeout(() => setShowMapOverlay(false), 1200);
      }
    } else {
      setIsExpanded(false);
      setShowMapOverlay(false);
      setAirplaneFlying(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-center mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-center mb-4 text-gray-600">{description}</p>
      
      {/* Animation 1: Elegant Slide Over */}
      {animationType === 'slide-over' && (
        <div className="relative w-full h-[400px] overflow-hidden bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer"
             onClick={toggleExpand}>
          
          {/* Background Image - Always Visible */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="Thailand Tour"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>
          </div>
          
          {/* Pre-Program Content - Basic Info Overlay */}
          <div className={`
            absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ease-out
            ${isExpanded ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}
          `}>
            <h2 className="text-white text-lg font-bold mb-1">ทัวร์ญี่ปุ่น 5 วัน</h2>
            <p className="text-white/90 text-sm mb-2">โตเกียว • โอซาก้า • ภูเขาไฟฟูจิ</p>
            <div className="flex items-center gap-1 text-white text-sm">
              <span>฿45,900</span>
              <span className="text-xs">คลิกเพื่อดูรายละเอียด</span>
            </div>
          </div>
          
          {/* Full-Program Content - Slides Up from Bottom - COMPLETE VERSION */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-500 ease-out
            ${isExpanded ? 'transform translate-y-0' : 'transform translate-y-full'}
          `}>
            <div className="h-full overflow-y-auto">
              {/* Image Section - Full */}
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Thailand Tour"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlays */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
                    ลด 25%
                  </span>
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-blue-600" />
                    5 วัน 4 คืน
                  </div>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleExpand(); }} 
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              {/* Content Section - Full */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
                  ทัวร์ญี่ปุ่น 5 วัน โตเกียว โอซาก้า ภูเขาไฟฟูจิ สวนสนุก ดิสนีย์แลนด์
                </h3>
                
                {/* Location Info */}
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-medium">ญี่ปุ่น</span>
                  </div>
                  <span className="text-gray-600">โตเกียว, โอซาก้า, ฟูจิ</span>
                </div>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">ดิสนีย์แลนด์</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">ภูเขาไฟฟูจิ</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">ออนเซ็น</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">4.8</span>
                  </div>
                  <span className="text-gray-500 text-sm">(256 รีวิว)</span>
                  <div className="flex items-center text-green-600 text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">รีวิวจริง</span>
                  </div>
                </div>

                {/* Enhanced information */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">สายการบิน:</span>
                      <div className="font-medium">JAL / ANA</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium">ตลอดปี</div>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-gray-400 line-through mr-2">฿61,200</span>
                    <span className="text-2xl font-bold text-blue-600">฿45,900</span>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                    <div className="text-xs text-green-600 font-medium">ประหยัด ฿15,300</div>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all">
                      จองทันที
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                      ดูเพิ่มเติม
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 2: Smooth Fade Cross-Dissolve */}
      {animationType === 'fade-dissolve' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-400 ease-in-out
            ${isExpanded ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1504109586057-fddbbc473be2?w=400&h=300&fit=crop"
                alt="Korea Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์เกาหลี 6 วัน โซล ปูซาน เกาะเชจู</h2>
                <p className="text-sm text-gray-600 mb-2">โซล • ปูซาน • เกาะเชจู</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿52,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-400 ease-in-out bg-white
            ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1504109586057-fddbbc473be2?w=400&h=300&fit=crop"
                  alt="Korea Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์เกาหลี 6 วัน โซล ปูซาน เกาะเชจู</h3>
                <p className="text-sm text-gray-600 mb-3">โซล • ปูซาน • เกาะเชจู</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>เกาหลีใต้</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>6 วัน 5 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.7 (189 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">สายการบิน:</span>
                      <div className="font-medium">Korean Air</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium">ตลอดปี</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿52,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 3: Premium Push Up */}
      {animationType === 'push-up' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program - Push Up - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-500 ease-out bg-white
            ${isExpanded ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop"
                alt="Europe Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ยุโรป 8 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">ฝรั่งเศส • อิตาลี • สวิตเซอร์แลนด์</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿89,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Slide Up - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-500 ease-out bg-white
            ${isExpanded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop"
                  alt="Europe Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ยุโรป 8 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">ฝรั่งเศส • อิตาลี • สวิตเซอร์แลนด์</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ยุโรป</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>8 วัน 7 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.9 (324 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">สายการบิน:</span>
                      <div className="font-medium">Emirates</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium">เม.ย.-ต.ค.</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿89,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 4: Layered Reveal */}
      {animationType === 'layered-reveal' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Full-Program - Behind Layer - COMPLETE */}
          <div className="absolute inset-0">
            <div className="h-full overflow-y-auto bg-white">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop"
                  alt="China Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์จีน 7 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">ปักกิ่ง • เซี่ยงไฮ้ • จางเจียเจี้ย</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>จีน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>7 วัน 6 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.6 (167 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">สายการบิน:</span>
                      <div className="font-medium">China Southern</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium">ตลอดปี</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿38,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pre-Program - Slide Right - COMPLETE */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-500 ease-out
            ${isExpanded ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop"
                alt="China Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์จีน 7 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">ปักกิ่ง • เซี่ยงไฮ้ • จางเจียเจี้ย</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿38,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 5: Zoom & Replace */}
      {animationType === 'zoom-replace' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program - Zoom Out - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-500 ease-out bg-white
            ${isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                alt="Singapore Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์สิงคโปร์ 4 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">Marina Bay • Sentosa • Gardens by the Bay</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿28,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Zoom In - COMPLETE */}
          <div className={`
            absolute inset-0 transition-all duration-500 ease-out bg-white
            ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Singapore Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์สิงคโปร์ 4 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">Marina Bay • Sentosa • Gardens by the Bay</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>สิงคโปร์</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>4 วัน 3 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.5 (98 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">สายการบิน:</span>
                      <div className="font-medium">Singapore Air</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium">ตลอดปี</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿28,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 6: Morphing Reveal */}
      {animationType === 'morphing-reveal' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program - Morphing */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out
            ${isExpanded ? 'opacity-0 scale-90 rotate-3' : 'opacity-100 scale-100 rotate-0'}
          `}
               style={{
                 background: isExpanded ? 
                   'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' : 
                   'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                 borderRadius: isExpanded ? '50% 20% 80% 30%' : '12px',
                 filter: isExpanded ? 'blur(5px)' : 'blur(0px)'
               }}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"
                alt="Dubai Tour"
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 text-white">
                <h2 className="text-lg font-bold mb-1">ทัวร์ดูไบ 5 วัน</h2>
                <p className="text-white/90 text-sm mb-2">Burj Khalifa • Palm Jumeirah • Desert Safari</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">฿65,900</span>
                  <span className="text-xs text-white/80">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Morphed */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out
            ${isExpanded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-6'}
          `}
               style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 borderRadius: isExpanded ? '12px' : '30% 70% 20% 80%',
                 filter: isExpanded ? 'blur(0px)' : 'blur(3px)'
               }}>
            <div className="h-full overflow-y-auto relative">
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"
                    alt="Dubai Tour"
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute top-3 right-3">
                    <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ดูไบ 5 วัน</h3>
                  <p className="text-sm text-gray-600 mb-3">Burj Khalifa • Palm Jumeirah • Desert Safari</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>สหรัฐอาหรับเอมิเรตส์</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>5 วัน 4 คืน</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>4.7 (203 รีวิว)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">สายการบิน:</span>
                        <div className="font-medium">Emirates</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                        <div className="font-medium">ตลอดปี</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <div className="text-xl font-bold text-blue-600">฿65,900</div>
                      <div className="text-xs text-gray-500">ต่อคน</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                      <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 7: Electric Glitch */}
      {animationType === 'electric-glitch' && (
        <div className="relative w-full h-[400px] bg-black rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program - Glitch Effect */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}
               style={{
                 filter: isExpanded ? 'contrast(200%) brightness(150%) hue-rotate(180deg)' : 'none',
                 animation: isExpanded ? 'glitch 0.3s ease-out' : 'none'
               }}>
            <div className="h-full overflow-y-auto relative">
              {isExpanded && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
                  <div className="absolute inset-0 bg-red-500/10 animate-ping"></div>
                  <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white animate-pulse"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse delay-100"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-red-500 animate-pulse delay-200"></div>
                </div>
              )}
              
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
                alt="Tokyo Tech Tour"
                className="w-full h-48 object-cover"
                style={{
                  filter: isExpanded ? 'saturate(200%) contrast(150%)' : 'none'
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1 font-mono">TOKYO CYBER 6D</h2>
                <p className="text-sm text-gray-600 mb-2">Shibuya • Akihabara • Robot Restaurant</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-cyan-600 font-mono">¥75,900</span>
                  <span className="text-xs text-gray-500 font-mono">&gt; CLICK_TO_HACK</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Cyber Style */}
          <div className={`
            absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 transition-all duration-500 ease-out
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="h-full overflow-y-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10"></div>
              <div className="relative z-10">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
                    alt="Tokyo Tech Tour"
                    className="w-full h-full object-cover"
                    style={{ filter: 'saturate(120%) contrast(110%) hue-rotate(10deg)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-cyan-400 text-black rounded-full p-2 hover:bg-cyan-300 font-mono text-xs">X</button>
                  </div>
                </div>
                
                <div className="p-4 text-cyan-100">
                  <h3 className="font-bold text-lg text-cyan-400 mb-1 font-mono">&gt; TOKYO_CYBER_6D.exe</h3>
                  <p className="text-sm text-cyan-300 mb-3 font-mono">// Shibuya • Akihabara • Robot Restaurant</p>
                  
                  <div className="space-y-2 text-sm mb-4 font-mono">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <span className="text-cyan-400">$</span>
                      <span>LOCATION: Tokyo, Japan</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-200">
                      <span className="text-cyan-400">$</span>
                      <span>DURATION: 6 days 5 nights</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-200">
                      <span className="text-cyan-400">$</span>
                      <span>RATING: 4.9/5 (156 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-3 mb-4 font-mono">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div>
                        <span className="text-cyan-400">AIRLINE:</span>
                        <div className="text-cyan-100">ANA Cyber Class</div>
                      </div>
                      <div>
                        <span className="text-cyan-400">SEASON:</span>
                        <div className="text-cyan-100">All Year Available</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-cyan-500/30">
                    <div>
                      <div className="text-xl font-bold text-cyan-400 font-mono">¥75,900</div>
                      <div className="text-xs text-cyan-300 font-mono">/person</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-cyan-400 text-black py-2 px-4 rounded font-bold text-sm hover:bg-cyan-300 font-mono">EXEC</button>
                      <button className="border border-cyan-400 text-cyan-400 py-2 px-4 rounded font-medium text-sm hover:bg-cyan-400/20 font-mono">INFO</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 8: Flip Cube 3D */}
      {animationType === 'flip-cube-3d' && (
        <div className="relative w-full h-[400px] cursor-pointer"
             onClick={toggleExpand}
             style={{ perspective: '1000px' }}>
          
          <div className={`
            relative w-full h-full transition-all duration-700 ease-out preserve-3d
            ${isExpanded ? 'rotate-y-180 rotate-x-45' : 'rotate-y-0 rotate-x-0'}
          `}
               style={{
                 transformStyle: 'preserve-3d',
                 transform: isExpanded ? 
                   'rotateY(180deg) rotateX(15deg) rotateZ(5deg)' : 
                   'rotateY(0deg) rotateX(0deg) rotateZ(0deg)'
               }}>
            
            {/* Front Face - Pre-Program */}
            <div className="absolute inset-0 bg-white rounded-xl shadow-lg border border-gray-200 backface-hidden"
                 style={{ 
                   backfaceVisibility: 'hidden',
                   boxShadow: isExpanded ? 
                     '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 
                     '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                 }}>
              <div className="h-full overflow-y-auto">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Australia Tour"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ออสเตรเลีย 7 วัน</h2>
                  <p className="text-sm text-gray-600 mb-2">Sydney • Melbourne • Gold Coast</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">฿95,900</span>
                    <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back Face - Full-Program */}
            <div className="absolute inset-0 bg-white rounded-xl shadow-xl border border-gray-200 backface-hidden rotate-y-180"
                 style={{ 
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)',
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                 }}>
              <div className="h-full overflow-y-auto">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                    alt="Australia Tour"
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute top-3 right-3">
                    <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ออสเตรเลีย 7 วัน</h3>
                  <p className="text-sm text-gray-600 mb-3">Sydney • Melbourne • Gold Coast</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>ออสเตรเลีย</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>7 วัน 6 คืน</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>4.8 (142 รีวิว)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">สายการบิน:</span>
                        <div className="font-medium">Qantas</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                        <div className="font-medium">ต.ค.-เม.ษ.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <div className="text-xl font-bold text-blue-600">฿95,900</div>
                      <div className="text-xs text-gray-500">ต่อคน</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                      <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 9: Liquid Wave */}
      {animationType === 'liquid-wave' && (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Pre-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-500 ease-out
            ${isExpanded ? 'opacity-0 transform -translate-y-full' : 'opacity-100 transform translate-y-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
                alt="Maldives Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์มัลดีฟส์ 5 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">Water Villa • Snorkeling • Spa Resort</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿125,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อดูรายละเอียด</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave Effect */}
          <div className={`
            absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out
            ${isExpanded ? 'h-full' : 'h-0'}
          `}
               style={{
                 background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 197, 253, 0.9) 50%, rgba(219, 234, 254, 1) 100%)',
                 clipPath: isExpanded ? 
                   'polygon(0 0, 100% 0, 100% 85%, 0 100%)' : 
                   'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
               }}>
            <div className="relative w-full h-full">
              {/* Wave Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`
                  absolute -top-10 left-0 right-0 h-20 
                  ${isExpanded ? 'animate-pulse' : ''}
                `}
                     style={{
                       background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                       animation: isExpanded ? 'wave 2s ease-in-out infinite' : 'none'
                     }}>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Emerges from Wave */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out delay-300
            ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-full'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
                  alt="Maldives Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์มัลดีฟส์ 5 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">Water Villa • Snorkeling • Spa Resort</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>มัลดีฟส์</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>5 วัน 4 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.9 (89 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-700">สายการบิน:</span>
                      <div className="font-medium text-blue-900">Singapore Air</div>
                    </div>
                    <div>
                      <span className="text-blue-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-blue-900">ตลอดปี</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿125,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 10: Map Journey */}
      {animationType === 'map-journey' && (
        <div className="relative w-full h-[400px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* World Map Overlay during transition - Only show when showMapOverlay is true */}
          {showMapOverlay && (
            <div className="absolute inset-0 z-20 transition-opacity duration-500 ease-out opacity-100">
              <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center">
                {/* World Map SVG */}
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
                  <path d="M50,100 Q100,80 150,100 T250,100 Q300,90 350,100" 
                        stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" 
                             values="0;-10" dur="0.8s" repeatCount="1" />
                  </path>
                </svg>
                
                {/* Airplane Animation */}
                <div className={`
                  absolute top-1/2 left-8 transform -translate-y-1/2 transition-all duration-800 ease-out
                  ${airplaneFlying ? 'translate-x-32' : 'translate-x-0'}
                `}>
                  <div className="text-white text-2xl transform -rotate-12">✈️</div>
                </div>
                
                {/* Flight Info */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-sm font-medium text-gray-800">BKK → NRT</div>
                    <div className="text-xs text-gray-600">กำลังเดินทาง...</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Pre-Program - Always Behind */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop"
                alt="Japan Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ญี่ปุ่น 7 วัน โตเกียว โอซาก้า</h2>
                <p className="text-sm text-gray-600 mb-2">Tokyo • Osaka • Mount Fuji • Kyoto</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿68,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อเดินทาง</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program - Appears after journey */}
          <div className={`
            absolute inset-0 bg-white transition-opacity duration-500 ease-out
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}
               style={{
                 transitionDelay: isExpanded ? '1.3s' : '0s'
               }}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop"
                  alt="Japan Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ญี่ปุ่น 7 วัน โตเกียว โอซาก้า</h3>
                <p className="text-sm text-gray-600 mb-3">Tokyo • Osaka • Mount Fuji • Kyoto</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ญี่ปุ่น</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>7 วัน 6 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.8 (234 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3 mb-4 border border-red-100">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-red-700">สายการบิน:</span>
                      <div className="font-medium text-red-900">JAL</div>
                    </div>
                    <div>
                      <span className="text-red-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-red-900">มี.ค.-พ.ย.</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿68,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 11: Airplane Window */}
      {animationType === 'airplane-window' && (
        <div className="relative w-full h-[400px] bg-sky-400 rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Airplane Window Effect during transition */}
          <div className={`
            absolute inset-0 transition-all duration-1200 ease-out z-20
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-500 flex items-center justify-center">
              {/* Window Frame */}
              <div className="relative w-full h-full">
                <div className="absolute inset-4 bg-white/10 rounded-2xl border-8 border-gray-300 overflow-hidden">
                  {/* Sky and Clouds */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600">
                    {/* Animated Clouds */}
                    <div className={`
                      absolute top-4 w-16 h-8 bg-white/60 rounded-full
                      ${isExpanded ? 'animate-pulse transform translate-x-full' : ''}
                    `}></div>
                    <div className={`
                      absolute top-12 right-8 w-12 h-6 bg-white/40 rounded-full delay-300
                      ${isExpanded ? 'animate-pulse transform -translate-x-full' : ''}
                    `}></div>
                    <div className={`
                      absolute top-20 left-4 w-20 h-10 bg-white/50 rounded-full delay-500
                      ${isExpanded ? 'animate-bounce' : ''}
                    `}></div>
                    
                    {/* Destination View */}
                    <div className={`
                      absolute bottom-0 left-0 right-0 h-32 bg-green-200/30 transition-all duration-800
                      ${isExpanded ? 'transform translate-y-0' : 'transform translate-y-full'}
                    `}>
                      <div className="w-full h-full bg-gradient-to-t from-green-300/40 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Window Reflection */}
                  <div className="absolute top-2 left-2 w-8 h-12 bg-white/20 rounded-lg transform -skew-x-12"></div>
                </div>
                
                {/* Flight Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                    <div className="text-sm font-medium text-gray-800">กำลังลงจอด...</div>
                    <div className="text-xs text-gray-600">ยินดีต้อนรับสู่ประเทศปลายทาง</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pre-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=400&h=300&fit=crop"
                alt="Europe Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ยุโรป 10 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">ฝรั่งเศส • อิตาลี • เยอรมนี • สวิส</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿129,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อขึ้นเครื่อง</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-500 ease-out delay-1000
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=400&h=300&fit=crop"
                  alt="Europe Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ยุโรป 10 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">ฝรั่งเศส • อิตาลี • เยอรมนี • สวิส</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ยุโรป</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>10 วัน 9 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.9 (312 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4 border border-blue-100">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-700">สายการบิน:</span>
                      <div className="font-medium text-blue-900">Lufthansa</div>
                    </div>
                    <div>
                      <span className="text-blue-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-blue-900">เม.ย.-ต.ค.</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿129,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 12: Magic Portal */}
      {animationType === 'magic-portal' && (
        <div className="relative w-full h-[400px] bg-gradient-to-br from-purple-900 via-indigo-800 to-black rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Magic Portal Effect during transition */}
          <div className={`
            absolute inset-0 transition-all duration-1000 ease-out z-20
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Portal Ring */}
              <div className={`
                relative w-48 h-48 transition-all duration-1000 ease-out
                ${isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}>
                <div className="absolute inset-0 rounded-full border-4 border-gold-400 animate-spin" 
                     style={{ 
                       borderColor: '#FFD700',
                       animation: isExpanded ? 'spin 3s linear infinite' : 'none',
                       boxShadow: 'inset 0 0 20px #FFD700, 0 0 20px #FFD700'
                     }}>
                </div>
                <div className="absolute inset-2 rounded-full border-2 border-blue-400 animate-ping"
                     style={{ 
                       borderColor: '#60A5FA',
                       animationDuration: '2s'
                     }}>
                </div>
                
                {/* Portal Center - Destination Preview */}
                <div className={`
                  absolute inset-4 rounded-full overflow-hidden transition-all duration-800 delay-300
                  ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}
                     style={{
                       background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                       boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.5)'
                     }}>
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop"
                    alt="Destination Preview"
                    className="w-full h-full object-cover opacity-80"
                    style={{ filter: 'brightness(1.2) saturate(1.5)' }}
                  />
                </div>
                
                {/* Magical Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} 
                         className={`absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
                         style={{
                           top: `${20 + i * 15}%`,
                           left: `${10 + (i % 3) * 30}%`,
                           animationDelay: `${i * 200}ms`,
                           boxShadow: '0 0 10px #FFD700'
                         }}>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Portal Info */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="bg-purple-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gold-400/30">
                  <div className="text-sm font-medium text-gold-300">🌟 Portal Opening...</div>
                  <div className="text-xs text-purple-200">Destination Materializing</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pre-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
                alt="Iceland Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ไอซ์แลนด์ 8 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">Aurora • Blue Lagoon • Golden Circle</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿185,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อเปิดประตู</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out delay-800
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
                  alt="Iceland Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ไอซ์แลนด์ 8 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">Aurora • Blue Lagoon • Golden Circle</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ไอซ์แลนด์</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>8 วัน 7 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.9 (89 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 mb-4 border border-purple-100">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-purple-700">สายการบิน:</span>
                      <div className="font-medium text-purple-900">Icelandair</div>
                    </div>
                    <div>
                      <span className="text-purple-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-purple-900">ก.ย.-มี.ค.</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿185,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 13: Polaroid Memory */}
      {animationType === 'polaroid-memory' && (
        <div className="relative w-full h-[400px] bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Polaroid Camera Effect during transition */}
          <div className={`
            absolute inset-0 transition-all duration-1200 ease-out z-20
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-200 flex items-center justify-center">
              
              {/* Camera Flash Effect */}
              <div className={`
                absolute inset-0 bg-white transition-all duration-200
                ${isExpanded ? 'opacity-0' : 'opacity-100'}
              `} 
                   style={{
                     animation: isExpanded ? 'flash 0.3s ease-out' : 'none'
                   }}>
              </div>
              
              {/* Polaroid Photo Developing */}
              <div className={`
                relative w-64 h-80 bg-white rounded-t-lg shadow-2xl transition-all duration-1000 ease-out delay-300
                ${isExpanded ? 'transform translate-y-0 opacity-100 rotate-0' : 'transform translate-y-full opacity-0 rotate-12'}
              `}
                   style={{
                     background: 'linear-gradient(to bottom, #f3f4f6 0%, #f3f4f6 70%, white 70%, white 100%)'
                   }}>
                
                {/* Photo Area */}
                <div className="p-4 pb-2">
                  <div className="w-full h-48 bg-gray-200 rounded overflow-hidden relative">
                    {/* Developing Effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-gray-300 to-transparent transition-all duration-800 delay-500
                      ${isExpanded ? 'opacity-0' : 'opacity-100'}
                    `}></div>
                    
                    {/* Final Image */}
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                      alt="Developed Photo"
                      className={`w-full h-full object-cover transition-all duration-800 delay-700 ${isExpanded ? 'opacity-100 filter-none' : 'opacity-0 grayscale'}`}
                    />
                  </div>
                </div>
                
                {/* Polaroid Bottom Text */}
                <div className="px-4 pb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 font-mono">Memory Captured!</div>
                    <div className="text-xs text-gray-500 mt-1">Best Memories...</div>
                  </div>
                </div>
                
                {/* Vintage Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-400 rounded-tr-lg"></div>
              </div>
              
              {/* Camera Info */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="bg-amber-900/80 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm font-medium text-amber-100">📸 Developing...</div>
                  <div className="text-xs text-amber-200">Creating Beautiful Memory</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pre-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                alt="Turkey Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ตุรกี 9 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">Istanbul • Cappadocia • Pamukkale</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿79,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อถ่ายรูป</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out delay-1000
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Turkey Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ตุรกี 9 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">Istanbul • Cappadocia • Pamukkale</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ตุรกี</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>9 วัน 8 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.7 (156 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-4 border border-amber-100">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-amber-700">สายการบิน:</span>
                      <div className="font-medium text-amber-900">Turkish Airlines</div>
                    </div>
                    <div>
                      <span className="text-amber-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-amber-900">เม.ย.-ต.ค.</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿79,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation 14: Cultural Mask */}
      {animationType === 'cultural-mask' && (
        <div className="relative w-full h-[400px] bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 rounded-xl shadow-md border border-gray-200 cursor-pointer overflow-hidden"
             onClick={toggleExpand}>
          
          {/* Cultural Mask Effect during transition */}
          <div className={`
            absolute inset-0 transition-all duration-1000 ease-out z-20
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-orange-700/90 flex items-center justify-center">
              
              {/* Traditional Thai/Asian Mask */}
              <div className={`
                relative transition-all duration-1000 ease-out
                ${isExpanded ? 'transform rotate-0 scale-100 opacity-100' : 'transform rotate-180 scale-0 opacity-0'}
              `}>
                <div className="relative w-40 h-48 mx-auto">
                  {/* Mask Base */}
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-2xl"
                       style={{
                         background: 'linear-gradient(45deg, #FCD34D 0%, #F59E0B 50%, #DC2626 100%)',
                         clipPath: 'ellipse(70% 85% at 50% 45%)'
                       }}>
                  </div>
                  
                  {/* Mask Details */}
                  <div className="absolute inset-0">
                    {/* Eyes */}
                    <div className="absolute top-8 left-8 w-4 h-6 bg-black rounded-full"></div>
                    <div className="absolute top-8 right-8 w-4 h-6 bg-black rounded-full"></div>
                    
                    {/* Nose */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-red-700 rounded-full"></div>
                    
                    {/* Mouth */}
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-red-900 rounded-full"></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-600 rounded-full"></div>
                    <div className="absolute top-6 left-6 w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-6 right-6 w-3 h-3 bg-yellow-300 rounded-full"></div>
                  </div>
                  
                  {/* Mask Glow */}
                  <div className="absolute inset-0 rounded-full animate-pulse"
                       style={{
                         background: 'radial-gradient(circle, transparent 60%, rgba(255, 215, 0, 0.3) 100%)',
                         filter: 'blur(2px)'
                       }}>
                  </div>
                </div>
                
                {/* Spinning Away Effect */}
                <div className={`
                  absolute inset-0 transition-all duration-700 ease-out delay-600
                  ${isExpanded ? 'transform rotate-720 scale-0 opacity-0' : 'transform rotate-0 scale-100 opacity-100'}
                `}>
                  {/* This creates the mask "spinning away" effect */}
                </div>
              </div>
              
              {/* Cultural Info */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="bg-red-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-400/30">
                  <div className="text-sm font-medium text-yellow-300">🎭 Traditional Reveal</div>
                  <div className="text-xs text-red-200">Cultural Journey Begins</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pre-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="h-full overflow-y-auto">
              <img
                src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop"
                alt="Thailand Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">ทัวร์ไทยโบราณ 6 วัน</h2>
                <p className="text-sm text-gray-600 mb-2">กรุงเทพ • อยุธยา • สุโขทัย • เชียงใหม่</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">฿35,900</span>
                  <span className="text-xs text-gray-500">คลิกเพื่อเปิดหน้ากาก</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-Program */}
          <div className={`
            absolute inset-0 bg-white transition-all duration-700 ease-out delay-1200
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop"
                  alt="Thailand Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }} className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">×</button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">ทัวร์ไทยโบราณ 6 วัน</h3>
                <p className="text-sm text-gray-600 mb-3">กรุงเทพ • อยุธยา • สุโขทัย • เชียงใหม่</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>ประเทศไทย</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>6 วัน 5 คืน</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.6 (78 รีวิว)</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-3 mb-4 border border-red-100">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-red-700">การเดินทาง:</span>
                      <div className="font-medium text-red-900">รถปรับอากาศ</div>
                    </div>
                    <div>
                      <span className="text-red-700">ช่วงเวลาเดินทาง:</span>
                      <div className="font-medium text-red-900">ตลอดปี</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="text-xl font-bold text-blue-600">฿35,900</div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600">จองทันที</button>
                    <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-50">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-4">
        <button 
          onClick={toggleExpand}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          {isExpanded ? 'ย่อ' : 'ขยาย'}
        </button>
      </div>
    </div>
  );
};

export default function AnimationDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* CSS Animations for WOW Effects */}
      <style jsx>{`
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes rotate720 {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(720deg) scale(0); }
        }
        
        @keyframes portal-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px #FFD700, inset 0 0 20px #FFD700;
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px #FFD700, inset 0 0 40px #FFD700;
            transform: scale(1.05);
          }
        }
        
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-x-45 { transform: rotateX(45deg); }
        .rotate-x-0 { transform: rotateX(0deg); }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-720 { animation: rotate720 0.7s ease-out; }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Animation Demo - 9 Styles ✨
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DemoCard 
            title="1. Elegant Slide Over" 
            animationType="slide-over"
            description="Full content slides up from bottom"
          />
          
          <DemoCard 
            title="2. Fade Cross-Dissolve" 
            animationType="fade-dissolve"
            description="Smooth fade transition with subtle scale"
          />
          
          <DemoCard 
            title="3. Premium Push Up" 
            animationType="push-up"
            description="Pre content pushes up, Full slides in"
          />
          
          <DemoCard 
            title="4. Layered Reveal" 
            animationType="layered-reveal"
            description="Pre slides right to reveal Full beneath"
          />
          
          <DemoCard 
            title="5. Zoom & Replace" 
            animationType="zoom-replace"
            description="Apple-style zoom in/out transition"
          />
          
          <DemoCard 
            title="6. 🌈 Morphing Reveal" 
            animationType="morphing-reveal"
            description="Card morphs shape with liquid effects"
          />
          
          <DemoCard 
            title="7. ⚡ Electric Glitch" 
            animationType="electric-glitch"
            description="Cyberpunk glitch transformation"
          />
          
          <DemoCard 
            title="8. 🎭 Flip Cube 3D" 
            animationType="flip-cube-3d"
            description="3D cube rotation with depth"
          />
          
          <DemoCard 
            title="9. 🌊 Liquid Wave" 
            animationType="liquid-wave"
            description="Wave liquid transition effect"
          />
          
          <DemoCard 
            title="10. 🗺️ Map Journey" 
            animationType="map-journey"
            description="Travel like airplane flight path"
          />
          
          <DemoCard 
            title="11. ✈️ Airplane Window" 
            animationType="airplane-window"
            description="View from airplane window during flight"
          />
          
          <DemoCard 
            title="12. 🌟 Magic Portal" 
            animationType="magic-portal"
            description="Dimensional portal to destination"
          />
          
          <DemoCard 
            title="13. 📸 Polaroid Memory" 
            animationType="polaroid-memory"
            description="Vintage polaroid photo development"
          />
          
          <DemoCard 
            title="14. 🎭 Cultural Mask" 
            animationType="cultural-mask"
            description="Traditional cultural mask reveal"
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">คลิกที่การ์ดหรือปุ่ม "ขยาย" เพื่อดู animation แต่ละแบบ</p>
          <p className="text-sm text-gray-500 mt-2">Animation 10-14 เป็นธีมเดินทางพิเศษเฉพาะทัวร์ต่างประเทศ</p>
        </div>
      </div>
    </div>
  );
}