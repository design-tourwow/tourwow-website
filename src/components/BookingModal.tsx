import React, { useState } from 'react';
import { XCircle, User, Phone, Mail, CheckCircle, Info, Calendar, Users, DollarSign, PartyPopper } from 'lucide-react';
import AddressForm from './AddressForm';
import { useAddressForm, useThailandData } from '@/hooks/useThailandData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: BookingFormData) => void;
  tourSummary: {
    tourName: string;
    dateRange: string;
    pricePerPerson: number;
    travelerCount: number;
    totalAmount: number;
  };
  isEditMode?: boolean;
  editData?: {
    id: number | string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    traveler_count: number;
    address: string;
    sub_district: string;
    district: string;
    province: string;
    postal_code: string;
  };
  isGuestBooking?: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  provinceId?: number;
  districtId?: number;
  subDistrictId?: number;
  zipCode?: string;
}

export default function BookingModal({ isOpen, onClose, onConfirm, tourSummary, isEditMode = false, editData, isGuestBooking = false }: BookingModalProps) {
  // ต้องเรียก hook useThailandData() ทันทีหลังรับ props
  const { provinces, districts, subDistricts } = useThailandData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [subDistrictId, setSubDistrictId] = useState(0);
  const [zipCode, setZipCode] = useState('');
  
  // New booking form states
  const [selectedDate, setSelectedDate] = useState('');
  const [travelerCount, setTravelerCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle booking submission
  const handleBookingSubmit = async () => {
    if (!selectedDate) {
      setFormError('กรุณาเลือกวันที่เดินทาง');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onConfirm callback with booking data
      onConfirm({
        name: '',
        phone: '',
        email: '',
        address: '',
        provinceId: 0,
        districtId: 0,
        subDistrictId: 0,
        zipCode: ''
      });
      
      // Close modal after successful booking
      onClose();
    } catch (error) {
      setFormError('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-fill data in edit mode
  React.useEffect(() => {
    console.log('🔧 BookingModal useEffect:', { isEditMode, editData: editData?.id, isOpen });
    if (isEditMode && editData && isOpen) {
      console.log('🎯 Pre-filling edit data:', {
        customer_name: editData.customer_name,
        customer_phone: editData.customer_phone,
        customer_email: editData.customer_email,
        address: editData.address,
        province: editData.province,
        district: editData.district,
        sub_district: editData.sub_district,
        postal_code: editData.postal_code,
        traveler_count: editData.traveler_count
      });
      setName(editData.customer_name || '');
      setPhone(editData.customer_phone || '');
      setEmail(editData.customer_email || '');
      setAddress(editData.address || '');
      setZipCode(editData.postal_code || '');
      
      // Lookup province/district/subdistrict IDs from names
      if (provinces.length > 0 && districts.length > 0 && subDistricts.length > 0) {
        console.log('🔍 Looking up location IDs...');
        
        // Find province ID
        const foundProvince = provinces.find(p => p.name_th === editData.province);
        if (foundProvince) {
          console.log('✅ Found province:', foundProvince.name_th, 'ID:', foundProvince.id);
          setProvinceId(foundProvince.id);
          
          // Find district ID within this province
          const foundDistrict = districts.find(d => 
            d.name_th === editData.district && d.province_id === foundProvince.id
          );
          if (foundDistrict) {
            console.log('✅ Found district:', foundDistrict.name_th, 'ID:', foundDistrict.id);
            setDistrictId(foundDistrict.id);
            
            // Find sub-district ID within this district
            const foundSubDistrict = subDistricts.find(sd => 
              sd.name_th === editData.sub_district && sd.amphure_id === foundDistrict.id
            );
            if (foundSubDistrict) {
              console.log('✅ Found sub-district:', foundSubDistrict.name_th, 'ID:', foundSubDistrict.id);
              setSubDistrictId(foundSubDistrict.id);
              // เซ็ต step เป็น 1 เฉพาะครั้งแรกที่โหลดข้อมูล
              if (!isDataPreFilled) {
                setCurrentStep(1);
                setIsDataPreFilled(true);
              }
            }
          }
        }
      } else {
        console.log('⏳ Thailand data not loaded yet, will retry...');
      }
    } else if (!isEditMode && isOpen) {
      // Reset form in new booking mode
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setProvinceId(0);
      setDistrictId(0);
      setSubDistrictId(0);
      setZipCode('');
      setCurrentStep(1);
      setIsDataPreFilled(false);
    }
  }, [isEditMode, editData, isOpen, provinces, districts, subDistricts]);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic Info, 2: Address Info
  const [isDataPreFilled, setIsDataPreFilled] = useState(false); // Track if edit data is already pre-filled

  // Lock background scroll and handle keyboard events when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      
      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.classList.remove('overflow-hidden');
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen, onClose]);

  // Persist form fields to localStorage
  React.useEffect(() => {
    setName(localStorage.getItem('booking_name') || '');
    setPhone(localStorage.getItem('booking_phone') || '');
    setEmail(localStorage.getItem('booking_email') || '');
    setAddress(localStorage.getItem('booking_address') || '');
    setProvinceId(Number(localStorage.getItem('booking_provinceId')) || 0);
    setDistrictId(Number(localStorage.getItem('booking_districtId')) || 0);
    setSubDistrictId(Number(localStorage.getItem('booking_subDistrictId')) || 0);
    setZipCode(localStorage.getItem('booking_zipCode') || '');
  }, []);

  React.useEffect(() => { localStorage.setItem('booking_name', name); }, [name]);
  React.useEffect(() => { localStorage.setItem('booking_phone', phone); }, [phone]);
  React.useEffect(() => { localStorage.setItem('booking_email', email); }, [email]);
  React.useEffect(() => { localStorage.setItem('booking_address', address); }, [address]);
  React.useEffect(() => { localStorage.setItem('booking_provinceId', String(provinceId)); }, [provinceId]);
  React.useEffect(() => { localStorage.setItem('booking_districtId', String(districtId)); }, [districtId]);
  React.useEffect(() => { localStorage.setItem('booking_subDistrictId', String(subDistrictId)); }, [subDistrictId]);
  React.useEffect(() => { localStorage.setItem('booking_zipCode', zipCode); }, [zipCode]);

  console.log('🔍 BookingModal render check:', { 
    isOpen, 
    isEditMode, 
    editDataId: editData?.id,
    hasEditData: !!editData,
    customerName: editData?.customer_name,
    currentStep
  });
  
  if (!isOpen) {
    console.log('❌ BookingModal not rendering - isOpen is false');
    return null;
  }
  
  console.log('✅ BookingModal rendering...');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate step 2 (address step)
    if (currentStep === 2) {
      if (!address.trim() || !provinceId || !districtId || !subDistrictId || !zipCode.trim()) {
        setError('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
        return;
      }
      
      setError('');
      setSubmitting(true);
      await new Promise(res => setTimeout(res, 500));
      
      onConfirm({ 
        name, 
        phone, 
        email: email || undefined, 
        address, 
        provinceId, 
        districtId, 
        subDistrictId, 
        zipCode 
      });
      
      setSubmitting(false);
      setShowSuccess(true);
    }
  };

  const handleNextStep = () => {
    console.log('🔵 handleNextStep called');
    if (!name.trim() || !phone.trim()) {
      setError('กรุณากรอกชื่อ-นามสกุล และเบอร์โทรศัพท์');
      return;
    }
    // Email format validation (if not empty)
    if (email && !/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(email)) {
      setEmailError('รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }
    setEmailError('');
    setError('');
    console.log('🔵 Setting currentStep to 2');
    setCurrentStep(2);
    console.log('🔵 currentStep set to 2 completed');
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setProvinceId(0);
    setDistrictId(0);
    setSubDistrictId(0);
    setZipCode('');
    setCurrentStep(1);
    setError('');
    setShowSuccess(false);
    setIsDataPreFilled(false);
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
        <div className="relative w-full max-w-lg mx-2 sm:mx-4 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 animate-modalPop overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 text-center text-white">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-full">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">จองสำเร็จ!</h2>
            <p className="text-green-100 text-sm sm:text-base">ขอบคุณที่เลือกใช้บริการกับเรา</p>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4 text-sm sm:text-base">
                ทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียดการจองของคุณ
              </p>
              {isGuestBooking && (
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-center text-sm mb-2">
                  <b>หมายเหตุ:</b> คุณจองโดยไม่เข้าสู่ระบบ <br />
                  คุณจะ <b>ไม่สามารถดู/แก้ไข/ยกเลิก</b> รายการจองผ่านระบบได้ กรุณาตรวจสอบอีเมลและเบอร์โทรศัพท์ให้ถูกต้อง<br />
                  หากต้องการดู/แก้ไขรายการจองในอนาคต กรุณาสมัครสมาชิกและเข้าสู่ระบบ
                </div>
              )}
            </div>

            {/* Tour Summary */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-3 sm:p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300">โปรแกรมทัวร์</span>
                </div>
                <div className="font-semibold text-blue-900 dark:text-blue-200 text-sm sm:text-base leading-tight">
                  {tourSummary.tourName}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-3 sm:p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">ช่วงเวลาเดินทาง</span>
                </div>
                <div className="font-semibold text-green-900 dark:text-green-200 text-sm sm:text-base">
                  {tourSummary.dateRange}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-3 sm:p-4 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium text-purple-800 dark:text-purple-300">ผู้เดินทาง</span>
                </div>
                <div className="font-semibold text-purple-900 dark:text-purple-200 text-sm sm:text-base">
                  {tourSummary.travelerCount} คน × ฿{tourSummary.pricePerPerson.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 sm:p-4 text-white shadow-lg mb-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-100" />
                  <span className="font-semibold text-sm sm:text-base">ราคารวมทั้งสิ้น</span>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold">
                    ฿{tourSummary.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-green-100 opacity-90">
                    มัดจำ 30% = ฿{Math.round(tourSummary.totalAmount * 0.3).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Success Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-200 dark:border-blue-800">
              <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="font-semibold">ขั้นตอนถัดไป</span>
                </div>
                <ul className="space-y-1 text-xs list-disc list-inside pl-2">
                  <li>เอกสารทัวร์จะส่งไปที่อยู่ที่คุณระบุไว้</li>
                  <li>ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</li>
                  <li>กรุณาเตรียมเอกสารเดินทางให้พร้อม</li>
                  <li>ชำระเงินมัดจำตามที่แจ้งไว้</li>
                </ul>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              onClick={() => { 
                resetForm();
                onClose(); 
              }}
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> เรียบร้อย
            </button>
          </div>
        </div>
        <style jsx>{`
          .animate-fadeIn { animation: fadeIn 0.2s; }
          .animate-modalPop { animation: modalPop 0.25s cubic-bezier(.4,2,.6,1) }
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes modalPop { from { transform: scale(0.95); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        `}</style>
      </div>
    );
  }

  // Get all provinces, districts, subdistricts for summary lookup
  const getProvinceName = (id: number) => {
    const p = provinces?.find((p: any) => p.id === id);
    return p ? p.name_th : '';
  };
  const getDistrictName = (id: number) => {
    const d = districts?.find((d: any) => d.id === id);
    return d ? d.name_th : '';
  };
  const getSubDistrictName = (id: number) => {
    const s = subDistricts?.find((s: any) => s.id === id);
    return s ? s.name_th : '';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header with Tour Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 id="booking-modal-title" className="text-xl md:text-2xl font-bold">จองทัวร์</h3>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="ปิด"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-100">{tourSummary.tourName}</h4>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <span>💰 ฿{tourSummary.pricePerPerson.toLocaleString()}/คน</span>
              <span>📅 {tourSummary.dateRange}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                วันที่เดินทาง
              </label>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="">เลือกวันที่เดินทาง</option>
                <option value="15 ม.ค. 68 - 19 ม.ค. 68">15 ม.ค. 68 - 19 ม.ค. 68</option>
                <option value="22 ม.ค. 68 - 26 ม.ค. 68">22 ม.ค. 68 - 26 ม.ค. 68</option>
                <option value="29 ม.ค. 68 - 2 ก.พ. 68">29 ม.ค. 68 - 2 ก.พ. 68</option>
              </select>
            </div>

            {/* Traveler Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                จำนวนผู้เดินทาง
              </label>
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={travelerCount <= 1}
                >
                  <XCircle className="w-5 h-5 text-gray-600" />
                </button>
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-800 block">{travelerCount}</span>
                  <span className="text-sm text-gray-500">คน</span>
                </div>
                <button 
                  onClick={() => setTravelerCount(Math.min(10, travelerCount + 1))}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={travelerCount >= 10}
                >
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                รายละเอียดราคา
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ราคาต่อคน</span>
                  <span className="font-medium">฿{tourSummary.pricePerPerson.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนคน</span>
                  <span className="font-medium">{travelerCount} คน</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">ราคารวม</span>
                    <span className="text-xl font-bold text-blue-600">฿{(tourSummary.pricePerPerson * travelerCount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <div className="flex items-center gap-2 text-red-600">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-medium">{formError}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              onClick={handleBookingSubmit}
              disabled={!selectedDate || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  กำลังดำเนินการ...
                </div>
              ) : (
                'ดำเนินการจอง'
              )}
            </button>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500">
              <p>💳 ชำระเงินมัดจำ 30% เพื่อยืนยันการจอง</p>
              <p>📞 ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}