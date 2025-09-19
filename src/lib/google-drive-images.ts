// Google Drive Image URL Mapping
// Base folder: https://drive.google.com/drive/folders/1wJBhFAg89MS6EPfpGDoHRNsXBvH6nn5d

// คุณต้องอัปเดต file IDs ตามไฟล์จริงใน Google Drive
// วิธีหา file ID: คลิกขวาไฟล์ใน Google Drive > Get link > คัดลอก ID จาก URL

export const GOOGLE_DRIVE_IMAGES: Record<string, string> = {
  // Countries Images - ตามลำดับไฟล์ที่ส่งมา
  'cambodia.jpg': 'https://drive.google.com/uc?export=view&id=1-TFLWocxCtlm7-LpwADeEloMmB1FrmJh',
  'hongkong.jpg': 'https://drive.google.com/uc?export=view&id=10RHGEa-j8pRtVktmTdh4APsSHUguw9r0',
  'indonesia.jpg': 'https://drive.google.com/uc?export=view&id=16O2Km4Pi75rH_POPfu2PNYnBaVzd0AWP',
  'japan-1-1.jpg': 'https://drive.google.com/uc?export=view&id=1ApwnglWYNuUqJ3twBKR3A3Yt0BdpnVQD',
  'japan-1-2.jpg': 'https://drive.google.com/uc?export=view&id=1B5k-tXgBL8mrvIVqv_nK9e9goluppT4e',
  'japan-1-3.jpg': 'https://drive.google.com/uc?export=view&id=1EJG6tH0nwDi8eO7NfJe4EXqcenqRZcvo',
  'japan-1-4.jpg': 'https://drive.google.com/uc?export=view&id=1F53hVDMOXhdKuwtkJBQ1ovgRNBOwchcE',
  'japan-1.jpg': 'https://drive.google.com/uc?export=view&id=1FAWWv71hU8V3VJdz1ap-QVyM4GEWFQ5I',
  'japan-2.jpg': 'https://drive.google.com/uc?export=view&id=1HAl4iXIeimYtUgs2_LtNoiqpHfc3bQgM',
  'japan-3.jpg': 'https://drive.google.com/uc?export=view&id=1HiIpWCDN2K--GluZ03KxgaWkl-dccCRa',
  'japan-4.jpg': 'https://drive.google.com/uc?export=view&id=1JBTIXjitgqFQAaUUOC_-MBb-LaMg4s_m',
  'japan-5.jpg': 'https://drive.google.com/uc?export=view&id=1Ld7aEqZapdQ_StuEXdcrIA8LIaSYJ-TU',
  'japan-6.mov': 'https://drive.google.com/uc?export=view&id=1NMpomdMAJ8O51JJa8jtGENm1E2ztl2_e',
  'kazakhstan-1.mp4': 'https://drive.google.com/uc?export=view&id=1QpU2DG1JAXhfOIweqQIsf1Q3Lzk60NEg',
  'kazakhstan-2.jpg': 'https://drive.google.com/uc?export=view&id=1SFl0gVtJzVH6q2SDYiWcjqJxiDxKGwKT',
  'kazakhstan-3.jpg': 'https://drive.google.com/uc?export=view&id=1To17zzf_ajk9muY0x21JnQ3PuOxKqNSq',
  'kazakhstan-4.jpg': 'https://drive.google.com/uc?export=view&id=1XPYw3GyGdULosxDyuMSWSlnow8E14W0A',
  'laos.jpg': 'https://drive.google.com/uc?export=view&id=1YiK6Fn7QogiVd3Ovc4het_fYuiESBrgZ',
  'malaysia.jpg': 'https://drive.google.com/uc?export=view&id=1ZRJGB2RHUpwsyNHRmnx3PVt_-pjaGh3t',
  'philippines.jpg': 'https://drive.google.com/uc?export=view&id=1a7QT_A3-szWqgEAeoZyXLceyQrSDlnJK',
  'singapore.jpg': 'https://drive.google.com/uc?export=view&id=1e7Y9lNqkgEqCyb7C0rag9wdpF5p4HIQd',
  'south-korea.jpg': 'https://drive.google.com/uc?export=view&id=1e9A-BYHMOHcxt4BybLItv0Bi1zPwnjpH',
  'taiwan.jpg': 'https://drive.google.com/uc?export=view&id=1qGG5deDkAkDGD9zxvYMaLouuM6pRQytQ',
  'vietnam.jpg': 'https://drive.google.com/uc?export=view&id=1s7tJR4mk5J7zV-7tMuLfYbdT2j7OJy3q'
};

// Helper function to get Google Drive URL
export function getGoogleDriveImageUrl(imagePath: string): string {
  // Extract filename from path
  const filename = imagePath.split('/').pop();

  if (filename && GOOGLE_DRIVE_IMAGES[filename]) {
    return GOOGLE_DRIVE_IMAGES[filename];
  }

  // Fallback to original path if not found
  return imagePath;
}

// Helper function for countries images specifically
export function getCountryImageUrl(imageName: string): string {
  return getGoogleDriveImageUrl(`/images/countries/${imageName}`);
}