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

export default function BookingModal({ isOpen, onClose, onConfirm, tourSummary }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [subDistrictId, setSubDistrictId] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic Info, 2: Address Info

  // Lock background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

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

  // Get all provinces, districts, subdistricts for summary lookup
  const { provinces, districts, subDistricts } = useThailandData();

  if (!isOpen) return null;

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
    setCurrentStep(2);
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
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
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

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
      <div className="relative w-full max-w-4xl rounded-2xl shadow-2xl bg-white dark:bg-gray-900 flex flex-col lg:flex-row overflow-hidden border border-gray-200 dark:border-gray-700 animate-modalPop max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mt-2 sm:mt-0">
        {/* Close Button - Mobile optimized */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors z-20 p-1 sm:p-0"
          aria-label="ปิด"
        >
          <XCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Form Section - Mobile responsive */}
        <form className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-start sm:justify-center min-h-[400px] sm:min-h-[500px]" onSubmit={handleSubmit}>
          {/* Progress Steps - Mobile optimized */}
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-all ${
                currentStep >= 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : '1'}
              </div>
              <div className={`w-12 sm:w-16 h-1 rounded-full transition-all ${
                currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-all ${
                currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Step Header - Mobile responsive */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className={`p-1.5 sm:p-2 rounded-full ${currentStep === 1 ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-green-100 dark:bg-green-900/50'}`}>
              <CheckCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                {currentStep === 1 ? 'ข้อมูลผู้จอง' : 'ที่อยู่สำหรับจัดส่งเอกสาร'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {currentStep === 1 ? 'กรอกข้อมูลติดต่อของคุณ' : 'กรอกที่อยู่สำหรับจัดส่งเอกสารทัวร์'}
              </p>
            </div>
          </div>

          {/* Step 1: Basic Information - Mobile responsive */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    className="form-input w-full pl-9 sm:pl-10 pr-3 py-3 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition text-sm sm:text-base"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="tel"
                    className="form-input w-full pl-9 sm:pl-10 pr-3 py-3 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition text-sm sm:text-base"
                    value={phone}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">อีเมล (ถ้ามี)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    className="form-input w-full pl-9 sm:pl-10 pr-3 py-3 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition text-sm sm:text-base"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="กรอกอีเมล (ถ้ามี)"
                  />
                </div>
                {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
              </div>
            </div>
          )}

          {/* Step 2: Address Information - Mobile optimized */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <AddressForm
                address={address}
                provinceId={provinceId}
                districtId={districtId}
                subDistrictId={subDistrictId}
                zipCode={zipCode}
                onAddressChange={setAddress}
                onProvinceChange={setProvinceId}
                onDistrictChange={setDistrictId}
                onSubDistrictChange={setSubDistrictId}
                onZipCodeChange={setZipCode}
                disabled={submitting}
              />
            </div>
          )}
          
          {error && <div className="text-red-500 text-xs sm:text-sm mt-3 sm:mt-4 flex items-center gap-1"><Info className="w-3 h-3 sm:w-4 sm:h-4" /> {error}</div>}

          {/* Buttons - Mobile responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 lg:mt-8">
            {currentStep === 1 ? (
              <>
                <button
                  type="button"
                  className="flex-1 py-3 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 text-base sm:text-sm md:text-base lg:text-lg"
                  onClick={onClose}
                  disabled={submitting}
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" /> ยกเลิก
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 sm:py-2.5 md:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2 text-base sm:text-sm md:text-base lg:text-lg"
                  onClick={handleNextStep}
                >
                  ถัดไป <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="flex-1 py-3 sm:py-2.5 md:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 text-base sm:text-sm md:text-base lg:text-lg"
                  onClick={() => setCurrentStep(1)}
                  disabled={submitting}
                >
                  ← ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 sm:py-2.5 md:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2 text-base sm:text-sm md:text-base lg:text-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={submitting}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> {submitting ? 'กำลังส่ง...' : 'ยืนยันการจอง'}
                </button>
              </>
            )}
          </div>
        </form>

        {/* Summary Section - Mobile responsive */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-start sm:justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 min-w-0 sm:min-w-[300px] lg:min-w-[350px]">
          <div className="mb-4 sm:mb-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-200">สรุปการจอง</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 1 ? 'รายละเอียดทัวร์ที่คุณเลือก' : 'ตรวจสอบข้อมูลก่อนยืนยันการจอง'}
            </p>
          </div>
          
          {/* Show booking summary based on step */}
          {currentStep === 2 && name && (
            <div className="mb-3 sm:mb-4 bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">ข้อมูลผู้จอง</span>
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div><span className="font-medium">ชื่อ:</span> {name}</div>
                <div><span className="font-medium">โทร:</span> {phone}</div>
                {email && <div><span className="font-medium">อีเมล:</span> {email}</div>}
                <div><span className="font-medium">ที่อยู่:</span> {address}
                  {subDistrictId ? ` ตำบล/แขวง ${getSubDistrictName(subDistrictId)}` : ''}
                  {districtId ? ` อำเภอ/เขต ${getDistrictName(districtId)}` : ''}
                  {provinceId ? ` จังหวัด ${getProvinceName(provinceId)}` : ''}
                  {zipCode ? ` ${zipCode}` : ''}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">โปรแกรมทัวร์</span>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white leading-relaxed text-sm sm:text-base">
                {tourSummary.tourName}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">ช่วงเวลาเดินทาง</span>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {tourSummary.dateRange}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">ผู้เดินทาง</span>
              </div>
              <div className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white">
                {tourSummary.travelerCount} คน × ฿{tourSummary.pricePerPerson.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 sm:p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-100" />
                <span className="font-semibold text-xs sm:text-sm">ราคารวมทั้งสิ้น</span>
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                  ฿{tourSummary.totalAmount.toLocaleString()}
                </div>
                <div className="text-xs text-blue-100 opacity-90">
                  มัดจำ 30% = ฿{Math.round(tourSummary.totalAmount * 0.3).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .animate-fadeIn { animation: fadeIn 0.2s; }
          .animate-modalPop { animation: modalPop 0.25s cubic-bezier(.4,2,.6,1) }
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes modalPop { from { transform: scale(0.95); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        `}</style>
      </div>
    </div>
  );
}