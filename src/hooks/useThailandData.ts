import { useState, useEffect, useMemo } from 'react';

// Types สำหรับข้อมูลที่อยู่ไทย
export interface Province {
  id: number;
  name_th: string;
  name_en: string;
  geography_id: number;
}

export interface District {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
}

export interface SubDistrict {
  id: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
  zip_code: number;
}

export interface AddressData {
  provinceId: number;
  districtId: number;
  subDistrictId: number;
  zipCode: string;
}

export const useThailandData = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let provincesData, districtsData, subDistrictsData;
        // Try fetch from public first
        let fetchFailed = false;
        try {
          console.log('🔍 Fetching Thailand data...');
          const [provincesRes, districtsRes, subDistrictsRes] = await Promise.all([
            fetch('/data/thailand/provinces.json'),
            fetch('/data/thailand/districts.json'),
            fetch('/data/thailand/sub-districts.json')
          ]);
          console.log('📊 Fetch responses:', {
            provinces: provincesRes.status,
            districts: districtsRes.status, 
            subDistricts: subDistrictsRes.status
          });
          if (!provincesRes.ok || !districtsRes.ok || !subDistrictsRes.ok) {
            fetchFailed = true;
          } else {
            [provincesData, districtsData, subDistrictsData] = await Promise.all([
              provincesRes.json(),
              districtsRes.json(),
              subDistrictsRes.json()
            ]);
          }
        } catch (e) {
          console.error('❌ Fetch error:', e);
          fetchFailed = true;
        }
        // Fallback: try require from data/thailand (Node.js only)
        // ลบ fallback require Node.js only (deploy prod จะ error ถ้ามี)
        // if (fetchFailed && typeof window === 'undefined') {
        //   provincesData = require('../../../data/thailand/provinces.json');
        //   districtsData = require('../../../data/thailand/districts.json');
        //   subDistrictsData = require('../../../data/thailand/sub-districts.json');
        // }
        if (!provincesData || !districtsData || !subDistrictsData) {
          throw new Error('Failed to load Thailand data');
        }
        setProvinces(provincesData);
        setDistricts(districtsData);
        setSubDistricts(subDistrictsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ฟังก์ชันสำหรับ filter ข้อมูลตาม parent
  const getDistrictsByProvince = useMemo(() => {
    return (provinceId: number) => {
      return districts.filter(district => district.province_id === provinceId);
    };
  }, [districts]);

  const getSubDistrictsByDistrict = useMemo(() => {
    return (districtId: number) => {
      return subDistricts.filter(subDistrict => subDistrict.amphure_id === districtId);
    };
  }, [subDistricts]);

  // หา zip code จาก sub district
  const getZipCodeBySubDistrict = useMemo(() => {
    return (subDistrictId: number) => {
      const subDistrict = subDistricts.find(sd => sd.id === subDistrictId);
      return subDistrict ? subDistrict.zip_code.toString() : '';
    };
  }, [subDistricts]);

  // หาข้อมูลสมบูรณ์จาก IDs
  const getFullAddress = useMemo(() => {
    return (provinceId: number, districtId: number, subDistrictId: number) => {
      const province = provinces.find(p => p.id === provinceId);
      const district = districts.find(d => d.id === districtId);
      const subDistrict = subDistricts.find(sd => sd.id === subDistrictId);
      
      return {
        province: province ? { id: province.id, name: province.name_th } : null,
        district: district ? { id: district.id, name: district.name_th } : null,
        subDistrict: subDistrict ? { 
          id: subDistrict.id, 
          name: subDistrict.name_th,
          zipCode: subDistrict.zip_code.toString()
        } : null
      };
    };
  }, [provinces, districts, subDistricts]);

  return {
    provinces,
    districts,
    subDistricts,
    loading,
    error,
    
    // Helper functions
    getDistrictsByProvince,
    getSubDistrictsByDistrict,
    getZipCodeBySubDistrict,
    getFullAddress
  };
};

// Hook สำหรับจัดการ address form state
export const useAddressForm = () => {
  const [addressData, setAddressData] = useState<AddressData>({
    provinceId: 0,
    districtId: 0,
    subDistrictId: 0,
    zipCode: ''
  });

  const { 
    provinces, 
    loading, 
    error,
    getDistrictsByProvince,
    getSubDistrictsByDistrict,
    getZipCodeBySubDistrict 
  } = useThailandData();

  // อัปเดต province และ reset district/subdistrict
  const updateProvince = (provinceId: number) => {
    setAddressData({
      provinceId,
      districtId: 0,
      subDistrictId: 0,
      zipCode: ''
    });
  };

  // อัปเดต district และ reset subdistrict
  const updateDistrict = (districtId: number) => {
    setAddressData(prev => ({
      ...prev,
      districtId,
      subDistrictId: 0,
      zipCode: ''
    }));
  };

  // อัปเดต subdistrict และ auto-fill zip code
  const updateSubDistrict = (subDistrictId: number) => {
    const zipCode = getZipCodeBySubDistrict(subDistrictId);
    setAddressData(prev => ({
      ...prev,
      subDistrictId,
      zipCode
    }));
  };

  // Reset ข้อมูลทั้งหมด
  const resetAddress = () => {
    setAddressData({
      provinceId: 0,
      districtId: 0,
      subDistrictId: 0,
      zipCode: ''
    });
  };

  // Get available options for dropdowns
  const availableDistricts = addressData.provinceId ? getDistrictsByProvince(addressData.provinceId) : [];
  const availableSubDistricts = addressData.districtId ? getSubDistrictsByDistrict(addressData.districtId) : [];

  return {
    addressData,
    provinces,
    availableDistricts,
    availableSubDistricts,
    loading,
    error,
    
    // Actions
    updateProvince,
    updateDistrict,
    updateSubDistrict,
    resetAddress
  };
};