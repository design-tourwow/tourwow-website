import React from 'react';
import { MapPin, Home, Hash } from 'lucide-react';
import { useAddressForm } from '@/hooks/useThailandData';

interface AddressFormProps {
  address: string;
  provinceId: number;
  districtId: number;
  subDistrictId: number;
  zipCode: string;
  onAddressChange: (address: string) => void;
  onProvinceChange: (provinceId: number) => void;
  onDistrictChange: (districtId: number) => void;
  onSubDistrictChange: (subDistrictId: number) => void;
  onZipCodeChange: (zipCode: string) => void;
  disabled?: boolean;
}

export default function AddressForm({
  address,
  provinceId,
  districtId,
  subDistrictId,
  zipCode,
  onAddressChange,
  onProvinceChange,
  onDistrictChange,
  onSubDistrictChange,
  onZipCodeChange,
  disabled = false
}: AddressFormProps) {
  const {
    provinces,
    availableDistricts,
    availableSubDistricts,
    loading,
    error,
    updateProvince,
    updateDistrict,
    updateSubDistrict,
    addressData
  } = useAddressForm();

  const [provinceSearch, setProvinceSearch] = React.useState('');
  const [showProvinceList, setShowProvinceList] = React.useState(false);
  const [districtSearch, setDistrictSearch] = React.useState('');
  const [showDistrictList, setShowDistrictList] = React.useState(false);

  const [subDistrictSearch, setSubDistrictSearch] = React.useState('');
  const [showSubDistrictList, setShowSubDistrictList] = React.useState(false);

  // Track if user is actively typing in each field
  const [provinceTyping, setProvinceTyping] = React.useState(false);
  const [districtTyping, setDistrictTyping] = React.useState(false);
  const [subDistrictTyping, setSubDistrictTyping] = React.useState(false);

  // Handle cascade updates
  const handleProvinceChange = (newProvinceId: number) => {
    updateProvince(newProvinceId);
    onProvinceChange(newProvinceId);
    onDistrictChange(0);
    onSubDistrictChange(0);
    onZipCodeChange('');
    setProvinceSearch('');
    setShowProvinceList(false);
  };

  const handleDistrictChange = (newDistrictId: number) => {
    updateDistrict(newDistrictId);
    onDistrictChange(newDistrictId);
    onSubDistrictChange(0);
    onZipCodeChange('');
    setDistrictSearch('');
    setShowDistrictList(false);
  };

  const handleSubDistrictChange = (newSubDistrictId: number) => {
    updateSubDistrict(newSubDistrictId);
    onSubDistrictChange(newSubDistrictId);
    
    // Auto-fill zip code
    const selectedSubDistrict = availableSubDistricts.find(sd => sd.id === newSubDistrictId);
    if (selectedSubDistrict) {
      onZipCodeChange(selectedSubDistrict.zip_code.toString());
    }
    setSubDistrictSearch('');
    setShowSubDistrictList(false);
  };

  // Province: show all if not typing, filter if typing
  const filteredProvinces = React.useMemo(() => {
    if (!provinceTyping) return provinces;
    return provinces.filter(p => p.name_th.toLowerCase().includes(provinceSearch.toLowerCase()));
  }, [provinceSearch, provinces, provinceTyping]);

  // District: show all if not typing, filter if typing
  const filteredDistricts = React.useMemo(() => {
    if (!districtTyping) return availableDistricts;
    return availableDistricts.filter(d => d.name_th.toLowerCase().includes(districtSearch.toLowerCase()));
  }, [districtSearch, availableDistricts, districtTyping]);

  // SubDistrict: show all if not typing, filter if typing
  const filteredSubDistricts = React.useMemo(() => {
    if (!subDistrictTyping) return availableSubDistricts;
    return availableSubDistricts.filter(sd => sd.name_th.toLowerCase().includes(subDistrictSearch.toLowerCase()));
  }, [subDistrictSearch, availableSubDistricts, subDistrictTyping]);

  // Only reset search when ID changes (not when typing)
  React.useEffect(() => {
    if (!provinceTyping) {
      const selected = provinces.find(p => p.id === provinceId);
      if (provinceId && selected) {
        setProvinceSearch(selected.name_th);
      } else if (!provinceId) {
        setProvinceSearch('');
      }
    }
  }, [provinceId, provinces]);

  React.useEffect(() => {
    if (!districtTyping) {
      const selected = availableDistricts.find(d => d.id === districtId);
      if (districtId && selected) {
        setDistrictSearch(selected.name_th);
      } else if (!districtId) {
        setDistrictSearch('');
      }
    }
  }, [districtId, availableDistricts]);

  React.useEffect(() => {
    if (!subDistrictTyping) {
      const selected = availableSubDistricts.find(sd => sd.id === subDistrictId);
      if (subDistrictId && selected) {
        setSubDistrictSearch(selected.name_th);
      } else if (!subDistrictId) {
        setSubDistrictSearch('');
      }
    }
  }, [subDistrictId, availableSubDistricts]);

  // Sync props id -> addressData ใน useAddressForm
  React.useEffect(() => {
    if (provinceId && provinceId !== addressData.provinceId) {
      updateProvince(provinceId);
    }
    // ต้องเช็ค district หลัง province ถูก set แล้วเท่านั้น
    if (
      provinceId === addressData.provinceId &&
      districtId && districtId !== addressData.districtId
    ) {
      updateDistrict(districtId);
    }
    // ต้องเช็ค subDistrict หลัง district ถูก set แล้วเท่านั้น
    if (
      districtId === addressData.districtId &&
      subDistrictId && subDistrictId !== addressData.subDistrictId
    ) {
      updateSubDistrict(subDistrictId);
    }
  }, [provinceId, districtId, subDistrictId, addressData.provinceId, addressData.districtId, addressData.subDistrictId]);

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-5">
        <div className="animate-pulse space-y-3 sm:space-y-4">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-xs sm:text-sm p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
        ⚠️ ไม่สามารถโหลดข้อมูลที่อยู่ได้: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ที่อยู่ */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          ที่อยู่ <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <textarea
            className="form-input w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition resize-none text-sm sm:text-base"
            rows={2}
            value={address}
            onChange={e => onAddressChange(e.target.value)}
            required
            disabled={disabled}
            placeholder="ที่อยู่เต็ม เช่น 123/45 ซอยลาดพร้าว 15"
          />
        </div>
      </div>
      
        {/* จังหวัด */}
      <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            จังหวัด <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
          <input
            type="text"
            className={`form-input w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base`}
            placeholder="ค้นหาจังหวัด..."
            value={provinceSearch}
            onChange={e => { setProvinceSearch(e.target.value); setProvinceTyping(true); }}
              disabled={disabled}
            autoComplete="off"
            onFocus={() => { setShowProvinceList(true); setProvinceTyping(false); }}
            onBlur={() => {
              setTimeout(() => setShowProvinceList(false), 150);
              // Only restore if field is empty and not being edited
              if (provinceSearch.trim() === '' && provinceId && !provinceTyping) {
                const selected = provinces.find(p => p.id === provinceId);
                if (selected) setProvinceSearch(selected.name_th);
              }
            }}
          />
          {showProvinceList && (
            <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto z-20">
              {filteredProvinces.length === 0 && (
                <li className="px-3 sm:px-4 py-2 text-gray-400 text-xs sm:text-sm">ไม่พบจังหวัด</li>
              )}
              {filteredProvinces.map(province => (
                <li
                  key={province.id}
                  className={`px-3 sm:px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs sm:text-sm ${provinceId === province.id ? 'bg-blue-100 dark:bg-blue-900/40 font-bold' : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation();
                    setProvinceTyping(false);
                    handleProvinceChange(province.id); 
                    setProvinceSearch(province.name_th); 
                    setShowProvinceList(false); 
                  }}
                >
                  {province.name_th}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
        
        {/* อำเภอ/เขต */}
      <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            อำเภอ/เขต <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
            <input
              type="text"
              className={`form-input w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base ${(!provinceId || availableDistricts.length === 0 || disabled) ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'}`}
              placeholder="ค้นหาอำเภอ/เขต..."
              value={districtSearch}
              onChange={e => { setDistrictSearch(e.target.value); setDistrictTyping(true); }}
              disabled={disabled || !provinceId || availableDistricts.length === 0}
              autoComplete="off"
              onFocus={() => { setShowDistrictList(true); setDistrictTyping(false); }}
              onBlur={() => {
                setTimeout(() => setShowDistrictList(false), 150);
                if (districtSearch.trim() === '' && districtId && !districtTyping) {
                  const selected = availableDistricts.find(d => d.id === districtId);
                  if (selected) setDistrictSearch(selected.name_th);
                }
              }}
            />
          {showDistrictList && (
            <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto z-20">
              {filteredDistricts.length === 0 && (
                <li className="px-3 sm:px-4 py-2 text-gray-400 text-xs sm:text-sm">ไม่พบอำเภอ/เขต</li>
              )}
              {filteredDistricts.map(district => (
                <li
                  key={district.id}
                  className={`px-3 sm:px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs sm:text-sm ${districtId === district.id ? 'bg-blue-100 dark:bg-blue-900/40 font-bold' : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation();
                    setDistrictTyping(false);
                    handleDistrictChange(district.id); 
                    setDistrictSearch(district.name_th); 
                    setShowDistrictList(false); 
                  }}
                >
                  {district.name_th}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ตำบล/แขวง */}
      <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            ตำบล/แขวง <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
            <input
              type="text"
              className={`form-input w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base ${(!districtId || availableSubDistricts.length === 0 || disabled) ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'}`}
              placeholder="ค้นหาตำบล/แขวง..."
              value={subDistrictSearch}
              onChange={e => { setSubDistrictSearch(e.target.value); setSubDistrictTyping(true); }}
              disabled={disabled || !districtId || availableSubDistricts.length === 0}
              autoComplete="off"
              onFocus={() => { setShowSubDistrictList(true); setSubDistrictTyping(false); }}
              onBlur={() => {
                setTimeout(() => setShowSubDistrictList(false), 150);
                if (subDistrictSearch.trim() === '' && subDistrictId && !subDistrictTyping) {
                  const selected = availableSubDistricts.find(sd => sd.id === subDistrictId);
                  if (selected) setSubDistrictSearch(selected.name_th);
                }
              }}
            />
          {showSubDistrictList && (
            <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto z-20">
              {filteredSubDistricts.length === 0 && (
                <li className="px-3 sm:px-4 py-2 text-gray-400 text-xs sm:text-sm">ไม่พบตำบล/แขวง</li>
              )}
              {filteredSubDistricts.map(subDistrict => (
                <li
                  key={subDistrict.id}
                  className={`px-3 sm:px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs sm:text-sm ${subDistrictId === subDistrict.id ? 'bg-blue-100 dark:bg-blue-900/40 font-bold' : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation();
                    setSubDistrictTyping(false);
                    handleSubDistrictChange(subDistrict.id); 
                    setSubDistrictSearch(subDistrict.name_th); 
                    setShowSubDistrictList(false); 
                  }}
                >
                  {subDistrict.name_th}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
        
        {/* รหัสไปรษณีย์ */}
      <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            รหัสไปรษณีย์ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              className={`form-input w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base ${(!subDistrictId || disabled) ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'}`}
              value={zipCode}
              onChange={e => onZipCodeChange(e.target.value.replace(/\D/g, '').substring(0, 5))}
              required
              disabled={disabled || !!subDistrictId}
              placeholder="00000"
              maxLength={5}
              pattern="[0-9]{5}"
            />
          </div>
          {subDistrictId && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              ✓ รหัสไปรษณีย์ถูกเติมอัตโนมัติ
            </p>
          )}
      </div>

      {/* แสดงข้อมูลที่เลือกแล้ว (สำหรับ debug/preview) */}
      {provinceId > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2.5 sm:p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-semibold">ที่อยู่ที่เลือก</span>
            </div>
            <div className="text-xs space-y-1">
              <div>จังหวัด: <span className="font-medium">{provinces.find(p => p.id === provinceId)?.name_th || '-'}</span></div>
              {districtId > 0 && (
                <div>อำเภอ/เขต: <span className="font-medium">{availableDistricts.find(d => d.id === districtId)?.name_th || '-'}</span></div>
              )}
              {subDistrictId > 0 && (
                <>
                  <div>ตำบล/แขวง: <span className="font-medium">{availableSubDistricts.find(sd => sd.id === subDistrictId)?.name_th || '-'}</span></div>
                  {zipCode && <div>รหัสไปรษณีย์: <span className="font-medium">{zipCode}</span></div>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}