import React, { useState, useEffect } from 'react';
import { XCircle, User, Phone, Mail, MapPin, Save, Edit3, CheckCircle } from 'lucide-react';
import AddressForm from './AddressForm';
import { useThailandData } from '@/hooks/useThailandData';

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditOrderFormData) => void;
  orderData: {
    id: number | string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    address: string;
    sub_district: string;
    district: string;
    province: string;
    postal_code: string;
    tour_name: string;
  };
}

export interface EditOrderFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  provinceId: number;
  districtId: number;
  subDistrictId: number;
  zipCode: string;
}

export default function EditOrderModal({ isOpen, onClose, onSave, orderData }: EditOrderModalProps) {
  const { provinces, districts, subDistricts } = useThailandData();
  
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

  // Pre-fill form data when modal opens
  useEffect(() => {
    if (isOpen && orderData) {
      console.log('🔧 Pre-filling edit order data:', orderData);
      
      setName(orderData.customer_name || '');
      setPhone(orderData.customer_phone || '');
      setEmail(orderData.customer_email || '');
      setAddress(orderData.address || '');
      setZipCode(orderData.postal_code || '');
      
      // Find province/district/subdistrict IDs from names
      if (provinces.length > 0 && districts.length > 0 && subDistricts.length > 0) {
        console.log('🔍 Looking up location IDs for edit modal...');
        
        // Find province ID
        const foundProvince = provinces.find(p => p.name_th === orderData.province);
        if (foundProvince) {
          console.log('✅ Found province:', foundProvince.name_th, 'ID:', foundProvince.id);
          setProvinceId(foundProvince.id);
          
          // Find district ID
          const foundDistrict = districts.find(d => 
            d.name_th === orderData.district && d.province_id === foundProvince.id
          );
          if (foundDistrict) {
            console.log('✅ Found district:', foundDistrict.name_th, 'ID:', foundDistrict.id);
            setDistrictId(foundDistrict.id);
            
            // Find sub-district ID
            const foundSubDistrict = subDistricts.find(sd => 
              sd.name_th === orderData.sub_district && sd.amphure_id === foundDistrict.id
            );
            if (foundSubDistrict) {
              console.log('✅ Found sub-district:', foundSubDistrict.name_th, 'ID:', foundSubDistrict.id);
              setSubDistrictId(foundSubDistrict.id);
            }
          }
        }
      }
    }
  }, [isOpen, orderData, provinces, districts, subDistricts]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name.trim() || !phone.trim()) {
      setError('กรุณากรอกชื่อ-นามสกุล และเบอร์โทรศัพท์');
      return;
    }

    // Email format validation (if not empty)
    if (email && !/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(email)) {
      setEmailError('รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    // Address validation
    if (!address.trim() || !provinceId || !districtId || !subDistrictId || !zipCode.trim()) {
      setError('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
      return;
    }
    
    setError('');
    setEmailError('');
    setSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      onSave({
        name,
        phone,
        email,
        address,
        provinceId,
        districtId,
        subDistrictId,
        zipCode
      });
      
    } catch (error) {
      console.error('Error saving order:', error);
      setError('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4">
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-700 animate-modalPop max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-100 hover:text-white transition-colors p-1"
            aria-label="ปิด"
          >
            <XCircle className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/30 rounded-full">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">แก้ไขข้อมูลการจอง</h2>
              <p className="text-blue-100 text-sm">หมายเลขจอง #{orderData.id}</p>
            </div>
          </div>
          
          {/* Tour name */}
          <div className="bg-blue-500/20 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-100 mb-1">โปรแกรมทัวร์</p>
            <p className="text-white font-medium text-sm leading-relaxed">{orderData.tour_name}</p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">ข้อมูลส่วนตัว</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="กรอกชื่อ-นามสกุล"
                    disabled={submitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
                    value={phone}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    placeholder="กรอกเบอร์โทรศัพท์"
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="กรอกอีเมล (ถ้ามี)"
                  disabled={submitting}
                />
              </div>
              {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">ที่อยู่สำหรับจัดส่งเอกสาร</h3>
            </div>
            
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

          {/* Error Messages */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
              disabled={submitting}
            >
              <XCircle className="w-4 h-4" />
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  บันทึกการเปลี่ยนแปลง
                </>
              )}
            </button>
          </div>
        </form>
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