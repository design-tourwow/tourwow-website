'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './animations.css';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Users, Heart, Zap, ChevronDown, 
  Calendar, ArrowRight, X
} from 'lucide-react';

// Global state to prevent multiple cards expanding simultaneously
let currentExpandingCard: string | null = null;
let expandingCardTimestamp: number = 0;

// LandmarkSlider Component
// Component for sliding text tags with landmark names
const LandmarkTextSlider: React.FC<{ 
  destinationTitle: string; 
  onIndexChange?: (index: number, landmark: { name: string; image?: string }) => void; 
}> = ({ destinationTitle, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get landmark data (same as LandmarkSlider)
  const getLandmarks = (title: string) => {
    if (title.includes('กรีซ')) {
      return [
        { name: 'อะโครโพลิส', image: 'https://images.unsplash.com/photo-1555993539-1732b0258238?w=1200&q=95' },
        { name: 'บ้านสีขาวซานโตรินี่', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=95' },
        { name: 'กังหันลมมิโคนอส', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95' },
        { name: 'ไอโดล เซนต์ นิโคลาส', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=95' },
        { name: 'วิลลา คนอสซอส', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=95' },
        { name: 'อ่าวนาวาจิโอ', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'โรงละครเอพิดอรัส', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=95' },
        { name: 'เมืองเก่าโรดส์', image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1200&q=95' },
        { name: 'หาดบาลอส', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'ถ้ำเมลิสซานี', image: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=1200&q=95' },
        { name: 'วิลลา แอชิลเลียน', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95' },
        { name: 'เมืองดิฟี้', image: 'https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=1200&q=95' },
        { name: 'ยอดเขาโอลิมปัส', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'ซามาเรีย โกร์จ', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' }
      ];
    } else if (title.includes('บาหลี')) {
      return [
        { name: 'วัดเบซากีห์', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=95' },
        { name: 'นาขั้นบันไดเตกัลลาลัง', image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=1200&q=95' },
        { name: 'ประตูสวรรค์', image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&q=95' },
        { name: 'วัดตานาห์ลอต', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=95' },
        { name: 'ป่าลิง', image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1200&q=95' },
        { name: 'ภูเขาไฟบาตูร์', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' },
        { name: 'วัดอูลูวาตู', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=95' },
        { name: 'หาดจิมบารัน', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=95' },
        { name: 'ตลาดอูบุด', image: 'https://images.unsplash.com/photo-1553837851-341a0c2509e6?w=1200&q=95' },
        { name: 'วัดติร์ตา เอ็มปุล', image: 'https://images.unsplash.com/photo-1587274403329-d3b2c0006b3f?w=1200&q=95' },
        { name: 'หาดกูตา', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&q=95' },
        { name: 'นูซา เปนิดา', image: 'https://images.unsplash.com/photo-1559930062-9f28fc2c3e0f?w=1200&q=95' },
        { name: 'หาดซานูร์', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=95' },
        { name: 'วัดลุมปูยัง', image: 'https://images.unsplash.com/photo-1608979969549-605a9ac0eef9?w=1200&q=95' },
        { name: 'เซกุมปุล วอเตอร์ฟอล', image: 'https://images.unsplash.com/photo-1588713966524-9b8dd2aa6ad6?w=1200&q=95' }
      ];
    } else if (title.includes('แคนาดา')) {
      return [
        { name: 'น้ำตกไนแอการา', image: 'https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=1200&q=95' },
        { name: 'ทะเลสาบหลุยส์', image: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200&q=95' },
        { name: 'แบนฟ์นาชั่นแนลปาร์ค', image: 'https://images.unsplash.com/photo-1565809882825-12a0fb9621f4?w=1200&q=95' },
        { name: 'โตรอนโตซีเอ็นทาวเวอร์', image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1200&q=95' },
        { name: 'มอนทรีออลเก่า', image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=1200&q=95' },
        { name: 'วิกตอเรียฮาร์เบอร์', image: 'https://images.unsplash.com/photo-1551266519-b6713933ebd6?w=1200&q=95' },
        { name: 'เจสเพอร์', image: 'https://images.unsplash.com/photo-1609788063095-d71bf3c1f01f?w=1200&q=95' },
        { name: 'ควิเบกซิตี้', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=95' },
        { name: 'ออตตาวา', image: 'https://images.unsplash.com/photo-1610132850201-8edd43223b21?w=1200&q=95' },
        { name: 'ปราสาทฟรอนเตแนค', image: 'https://images.unsplash.com/photo-1609043724863-5b22e59b8b5e?w=1200&q=95' },
        { name: 'สแตนลีย์ปาร์ค', image: 'https://images.unsplash.com/photo-1515295983258-ebe337cc088e?w=1200&q=95' },
        { name: 'ทะเลสาบมอร์เรน', image: 'https://images.unsplash.com/photo-1439818895160-f7f89b12c785?w=1200&q=95' },
        { name: 'ไอซ์ฟิลด์ส พาร์กเวย์', image: 'https://images.unsplash.com/photo-1502726299822-6f583f972e02?w=1200&q=95' },
        { name: 'จัสเปอร์สกายทราม', image: 'https://images.unsplash.com/photo-1608062719019-15541e5d1503?w=1200&q=95' },
        { name: 'พระราชวังโรยัล', image: 'https://images.unsplash.com/photo-1598532213919-078e54dd1f40?w=1200&q=95' }
      ];
    } else if (title.includes('สวิสเซอร์แลนด์')) {
      return [
        { name: 'ยอดเขาจุงเฟรา', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' },
        { name: 'สะพานชาเปล', image: 'https://images.unsplash.com/photo-1527004760902-426b67c08028?w=1200&q=95' },
        { name: 'ทะเลสาบเจนีวา', image: 'https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?w=1200&q=95' },
        { name: 'ยอดเขาแมทเทอร์ฮอร์น', image: 'https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=1200&q=95' },
        { name: 'น้ำตกไรน์', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&q=95' },
        { name: 'หมู่บ้านกรินเดลวาลด์', image: 'https://images.unsplash.com/photo-1596394723269-381df29e016e?w=1200&q=95' },
        { name: 'กลาเซียร์เอ็กซ์เพรส', image: 'https://images.unsplash.com/photo-1568864968893-89a96e383866?w=1200&q=95' },
        { name: 'ลูเซิร์นเก่า', image: 'https://images.unsplash.com/photo-1592288809514-74061e348ec2?w=1200&q=95' },
        { name: 'ปราสาทชิลยอง', image: 'https://images.unsplash.com/photo-1589979481516-4a5c5c90e28f?w=1200&q=95' },
        { name: 'ยอดเขามอนต์บลังค์', image: 'https://images.unsplash.com/photo-1635266507791-d666f61dd4f2?w=1200&q=95' },
        { name: 'ทะเลสาบซุก', image: 'https://images.unsplash.com/photo-1572102739548-d5a5ea9a2b6e?w=1200&q=95' },
        { name: 'อินเตอร์ลาเก็น', image: 'https://images.unsplash.com/photo-1589648424117-4a6943034cf1?w=1200&q=95' },
        { name: 'แซร์แมท', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=95' },
        { name: 'เบิร์นโอลด์ทาวน์', image: 'https://images.unsplash.com/photo-1601285281146-4a226237ad95?w=1200&q=95' },
        { name: 'น้ำตกทรุมเมิลบัค', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=95' }
      ];
    } else if (title.includes('มัลดีฟส์')) {
      return [
        { name: 'รีสอร์ทบนน้ำ', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=95' },
        { name: 'หาดทรายขาว', image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=95' },
        { name: 'ปะการังสีสวย', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=95' },
        { name: 'ดำน้ำดูปลา', image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&q=95' },
        { name: 'เกาะส่วนตัว', image: 'https://images.unsplash.com/photo-1540202404-a2f29a3e0409?w=1200&q=95' },
        { name: 'สปาบนทะเล', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=95' },
        { name: 'อาหารทะเล', image: 'https://images.unsplash.com/photo-1573225342350-16731dd9bf83?w=1200&q=95' },
        { name: 'พระอาทิตย์ตก', image: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&q=95' },
        { name: 'บีช วิลล่า', image: 'https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=1200&q=95' },
        { name: 'ที่นั่งใต้แสงไฟ', image: 'https://images.unsplash.com/photo-1514813626023-7c55b8c95b91?w=1200&q=95' },
        { name: 'เลานจ์บาร์', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=95' },
        { name: 'อุโมงค์ปลา', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=95' },
        { name: 'ตกปลาลึก', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=95' },
        { name: 'เซิร์ฟแพดเดิล', image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200&q=95' },
        { name: 'อูนดีอาร์ วอเตอร์', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=95' }
      ];
    } else if (title.includes('ญี่ปุ่น')) {
      return [
        { name: 'วัดอาซากุสะ', image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=95' },
        { name: 'ปราสาทโอซาก้า', image: 'https://images.unsplash.com/photo-1584839401423-cde80e04eb4b?w=1200&q=95' },
        { name: 'ศาลเจ้าฟูชิมิอินาริ', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'ภูเขาไฟฟูจิ', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95' },
        { name: 'วัดคินคะคุจิ', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=95' },
        { name: 'ตลาดซึคิจิ', image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=1200&q=95' },
        { name: 'โตเกียวสกายทรี', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=95' },
        { name: 'ป่าไผ่อาราชิยาม่า', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=95' },
        { name: 'ฮาราจูกุ', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&q=95' },
        { name: 'ชิบูย่าครอสซิ่ง', image: 'https://images.unsplash.com/photo-1540181871432-db4d9e65c201?w=1200&q=95' },
        { name: 'วัดเซนโซจิ', image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=95' },
        { name: 'กินคักุจิ', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=95' },
        { name: 'เนียงะโคฮัน', image: 'https://images.unsplash.com/photo-1514736797933-d0501ba2fe65?w=1200&q=95' },
        { name: 'ทาเคชิตา-โดริ', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&q=95' },
        { name: 'ทาการ์ดแห่งคิโยมิสุ', image: 'https://images.unsplash.com/photo-1588400683161-e9ea0a47b7e8?w=1200&q=95' }
      ];
    } else if (title.includes('ไอซ์แลนด์')) {
      return [
        { name: 'บลูลากูน', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=95' },
        { name: 'น้ำตกกูลล์ฟอสส์', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'ธารน้ำแข็งวัทนาโจกุล', image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&q=95' },
        { name: 'แสงเหนือ', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' },
        { name: 'ไกเซอร์', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=95' },
        { name: 'ทะเลสาบโจกุลซาร์ลอน', image: 'https://images.unsplash.com/photo-1464822759844-d150baec7288?w=1200&q=95' },
        { name: 'ถ้ำน้ำแข็ง', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'หาดทรายดำ', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95' },
        { name: 'น้ำตกสโกกาฟอสส์', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'ลันด์มันนาลาการ์', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=95' },
        { name: 'เซลยาแลนด์สฟอสส์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95' },
        { name: 'ไฮแลนด์ส', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'ฮาลโกรมสเคียร์คยา', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'วิก', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'เรคยาวิก', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' }
      ];
    } else if (title.includes('นอร์เวย์')) {
      return [
        { name: 'ไกรัง์แฟร์ฟยอร์ด', image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&q=95' },
        { name: 'แสงเหนือ', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' },
        { name: 'ลูฟเทน', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'ทรอลล์ทุงกา', image: 'https://images.unsplash.com/photo-1464822759844-d150baec7288?w=1200&q=95' },
        { name: 'เบอร์เกน', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'สต๊าวคิร์ก', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=95' },
        { name: 'พรีคีสโตเลน', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=95' },
        { name: 'หอคอยคิร์เคเนส', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'ฟลูม', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'นอร์ดแคปป์', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'ฮาร์ดังเงอร์ฟยอร์ด', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' },
        { name: 'ออร์เล่ซุนด์', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=95' },
        { name: 'แอตแลนติคโรด', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=95' },
        { name: 'ทรอมเซอ', image: 'https://images.unsplash.com/photo-1578945825053-308ce6e07bce?w=1200&q=95' },
        { name: 'เซเนียโซเนน', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&q=95' }
      ];
    } else if (title.includes('โลฟเทน')) {
      return [
        { name: 'หาดรีเน่', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'เฮนนิ่งส์แวร์', image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&q=95' },
        { name: 'รามเบิร์ก', image: 'https://images.unsplash.com/photo-1464822759844-d150baec7288?w=1200&q=95' },
        { name: 'อา', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'เรมสตาด', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=95' },
        { name: 'โซเคล', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=95' },
        { name: 'นุสฟยอร์ด', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'ฮัมนอย', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'สต็อกมาร์เนส', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'คบอลเวก', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' },
        { name: 'เวสทวากอย', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=95' },
        { name: 'กิมสอย', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=95' },
        { name: 'เลคเนส', image: 'https://images.unsplash.com/photo-1578945825053-308ce6e07bce?w=1200&q=95' },
        { name: 'วีกแสด้', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&q=95' },
        { name: 'ฟลาคสตาดอย', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' },
        { name: 'ฮานนิง์สฟยอร์ด', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=95' }
      ];
    } else if (title.includes('เยอรมนี')) {
      return [
        { name: 'ปราสาทนอยชวานชไตน์', image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&q=95' },
        { name: 'ประตูบรานเด็นเบิร์ก', image: 'https://images.unsplash.com/photo-1464822759844-d150baec7288?w=1200&q=95' },
        { name: 'สวนเบียร์', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'ไรน์แวลเลย์', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'โรแมนติกโร้ด', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=95' },
        { name: 'ฮาร์ซป่าดำ', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=95' },
        { name: 'โคโลญจ์ดอม', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'ปราสาทไฮเดลเบอร์ก', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'มิวนิค', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'เบอร์ลินวอล', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' },
        { name: 'ฮอเลินโซลเลิร์น', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=95' },
        { name: 'โรเทนบวร์ก', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=95' },
        { name: 'ไวมาร์', image: 'https://images.unsplash.com/photo-1578945825053-308ce6e07bce?w=1200&q=95' },
        { name: 'ดรีสเดน', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&q=95' },
        { name: 'วุร์ซบวร์ก', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' }
      ];
    } else if (title.includes('นิวซีแลนด์')) {
      return [
        { name: 'หมู่บ้านโฮบบิตัน', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=95' },
        { name: 'มิลฟอร์ดซาวนด์', image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&q=95' },
        { name: 'ทะเลสาบเทคาโป', image: 'https://images.unsplash.com/photo-1464822759844-d150baec7288?w=1200&q=95' },
        { name: 'ยอดเขาคุกมอร์แมท', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=1200&q=95' },
        { name: 'ไฟร์อดแลนด์', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=95' },
        { name: 'โรโตรัว', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=95' },
        { name: 'เบย์ออฟไอส์แลนด์', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'กลาเซียร์ฟรานซ์โจเซฟ', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'เวลลิงตัน', image: 'https://images.unsplash.com/photo-1583736772741-ddf99cf8b543?w=1200&q=95' },
        { name: 'เฟรนซ์พาส', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=95' },
        { name: 'แคธีดรัลโคฟ', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=95' },
        { name: 'เทการโป', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=95' },
        { name: 'วายตาคี', image: 'https://images.unsplash.com/photo-1578945825053-308ce6e07bce?w=1200&q=95' },
        { name: 'โมเอราคิโบลเดอร์ส', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&q=95' },
        { name: 'โทนการิโร', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95' }
      ];
    } else if (title.includes('กัมพูชา')) {
      return [
        { name: 'นครวัด', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00d93?w=400&h=300&fit=crop' },
        { name: 'ปราสาทบายน', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop' },
        { name: 'ตาพรหม', image: 'https://images.unsplash.com/photo-1574356438390-4d5cb4b23e85?w=400&h=300&fit=crop' },
        { name: 'บันเทียสรี', image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=300&fit=crop' },
        { name: 'ปราสาทแบนเตียยคเดย', image: 'https://images.unsplash.com/photo-1589308371632-9fb33c0b22b5?w=400&h=300&fit=crop' },
        { name: 'ทะเลสาบตันเลสาบ', image: 'https://images.unsplash.com/photo-1574356436327-21e0772c3b2d?w=400&h=300&fit=crop' },
        { name: 'พนมเปญ', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop' },
        { name: 'กำแพงเขมร', image: 'https://images.unsplash.com/photo-1574356436394-d6dbc03e3b63?w=400&h=300&fit=crop' },
        { name: 'บอกเก้าปราสาท', image: 'https://images.unsplash.com/photo-1574356438353-5ff2e26d0415?w=400&h=300&fit=crop' },
        { name: 'ปราสาทพระขาน', image: 'https://images.unsplash.com/photo-1604999333648-200b58e37525?w=400&h=300&fit=crop' },
        { name: 'ปรีอัปร่วป', image: 'https://images.unsplash.com/photo-1574356438300-ce1c5b68b785?w=400&h=300&fit=crop' },
        { name: 'คอห์เกอร์', image: 'https://images.unsplash.com/photo-1574356436310-b8b9ba79a55e?w=400&h=300&fit=crop' },
        { name: 'บันเทียย์ช์มาร์', image: 'https://images.unsplash.com/photo-1589308371730-f66e4d1bf50e?w=400&h=300&fit=crop' },
        { name: 'ปราสาทตาโซม', image: 'https://images.unsplash.com/photo-1604999333701-5e5b9e38d7da?w=400&h=300&fit=crop' },
        { name: 'สิลเวอร์แพโกดา', image: 'https://images.unsplash.com/photo-1544966503-2cc22d4e37b8?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('ตุรกี')) {
      return [
        { name: 'คัปปาโดเกีย', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop' },
        { name: 'บอลลูนอากาศร้อน', image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c60a?w=400&h=300&fit=crop' },
        { name: 'ปามุคคาเล่', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
        { name: 'ไฮเยอโซเฟีย', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop' },
        { name: 'บลูมอสก์', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop' },
        { name: 'แกรนด์บาซาร์', image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop' },
        { name: 'บอสฟอรัสบริดจ์', image: 'https://images.unsplash.com/photo-1493704476631-a56104b01b38?w=400&h=300&fit=crop' },
        { name: 'เมืองใต้ดิน', image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c60a?w=400&h=300&fit=crop' },
        { name: 'ไฟรี่ชิมนี่', image: 'https://images.unsplash.com/photo-1579985014641-e27df8ca7dc9?w=400&h=300&fit=crop' },
        { name: 'เอเฟซัส', image: 'https://images.unsplash.com/photo-1592914275460-6c0bb7fb0e01?w=400&h=300&fit=crop' },
        { name: 'ทรอย', image: 'https://images.unsplash.com/photo-1606834050436-a2a78346b7c8?w=400&h=300&fit=crop' },
        { name: 'ปราสาทบอดรัม', image: 'https://images.unsplash.com/photo-1570439662717-6969a7b3e25c?w=400&h=300&fit=crop' },
        { name: 'คาปาโดเชียแอร์บอลลูน', image: 'https://images.unsplash.com/photo-1520637736862-4d197d17c60a?w=400&h=300&fit=crop' },
        { name: 'โทปคาปี่แพเลซ', image: 'https://images.unsplash.com/photo-1589301773859-0fbb9f16dd5b?w=400&h=300&fit=crop' },
        { name: 'โกเร็มเนชั่นแนลปาร์ค', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('ออสเตรีย')) {
      return [
        { name: 'ปราสาทชอนบรุน', image: 'https://images.unsplash.com/photo-1520786829678-e1267b46b063?w=400&h=300&fit=crop' },
        { name: 'ซาลส์บวร์กเก่า', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
        { name: 'ฮัลสตั็ต', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00d93?w=400&h=300&fit=crop' },
        { name: 'อินส์บรุค', image: 'https://images.unsplash.com/photo-1610017194781-a2fad6e6e34e?w=400&h=300&fit=crop' },
        { name: 'เมลค์แอบบี', image: 'https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?w=400&h=300&fit=crop' },
        { name: 'ดานูบวาลเลย์', image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop' },
        { name: 'เวียนนาโอเปร่า', image: 'https://images.unsplash.com/photo-1607457520823-47e59f1b4f09?w=400&h=300&fit=crop' },
        { name: 'โมซาร์ตเบิร์ธเพลส', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
        { name: 'ไซน์ฟีลด์', image: 'https://images.unsplash.com/photo-1610017195001-d21b6e8c9f0a?w=400&h=300&fit=crop' },
        { name: 'ฮาลล์ชตัทเทอร์ลาเค่', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00d93?w=400&h=300&fit=crop' },
        { name: 'มิราเบลล์การ์เด้น', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
        { name: 'ริงสตราสเซ่', image: 'https://images.unsplash.com/photo-1607457520823-47e59f1b4f09?w=400&h=300&fit=crop' },
        { name: 'เซนต์สเตฟานคาเธดรัล', image: 'https://images.unsplash.com/photo-1520786829678-e1267b46b063?w=400&h=300&fit=crop' },
        { name: 'ซาลส์กัมเมอร์กุต', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00d93?w=400&h=300&fit=crop' },
        { name: 'อัลเพ็นบิส', image: 'https://images.unsplash.com/photo-1610017194781-a2fad6e6e34e?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('ปราก')) {
      return [
        { name: 'ปราสาทปราก', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'ชาร์ลส์บริดจ์', image: 'https://images.unsplash.com/photo-1561804996-b2b2e4f4ebd7?w=400&h=300&fit=crop' },
        { name: 'โอลด์ทาวน์สแควร์', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'เซนต์วิตัสคาเธดรัล', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'เก้าอี้ดานสิง', image: 'https://images.unsplash.com/photo-1561804996-b2b2e4f4ebd7?w=400&h=300&fit=crop' },
        { name: 'โกลเด้นเลน', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'แจ๊สคลับ', image: 'https://images.unsplash.com/photo-1520467659345-1c3663b66e17?w=400&h=300&fit=crop' },
        { name: 'เบียร์เช็ก', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop' },
        { name: 'วลทาวาริเวอร์', image: 'https://images.unsplash.com/photo-1561804996-b2b2e4f4ebd7?w=400&h=300&fit=crop' },
        { name: 'วาตซ์ลาฟสแควร์', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'เชสกี้ครุมลอฟ', image: 'https://images.unsplash.com/photo-1564594985645-4427056e22e2?w=400&h=300&fit=crop' },
        { name: 'ยิวอิชควอเตอร์', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'คาร์ลสตีจน์แคสเทิล', image: 'https://images.unsplash.com/photo-1564594985645-4427056e22e2?w=400&h=300&fit=crop' },
        { name: 'วิเชฮราด', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'พาวเดอร์ทาวเวอร์', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('ทัสคานี')) {
      return [
        { name: 'เลอานิ่งทาวเวอร์ออฟปิซา', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop' },
        { name: 'ดูโอโมฟลอเรนซ์', image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=400&h=300&fit=crop' },
        { name: 'วัลดอร์เชีย', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'ซานจิมิกนาโน', image: 'https://images.unsplash.com/photo-1544733503-6e40e5ef9de4?w=400&h=300&fit=crop' },
        { name: 'มอนเต็ลปุลเซียโน', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300&fit=crop' },
        { name: 'คิอานติไวน์เรจิ้น', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'ซีเอนาคาเธดรัล', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=300&fit=crop' },
        { name: 'พอนเต็เวกคิโอ', image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=400&h=300&fit=crop' },
        { name: 'อุฟฟิซี่แกลเลอรี่', image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=400&h=300&fit=crop' },
        { name: 'ทัสคันไวน์ยาร์ด', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'ซานควิริโกดอร์เซีย', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300&fit=crop' },
        { name: 'ซานมินิเอโต', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300&fit=crop' },
        { name: 'มอนทาลชิโน', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'กรีเว อิน คิอานติ', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'คอร์โตนา', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('โรม')) {
      return [
        { name: 'โคลอสเซียม', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop' },
        { name: 'หอเอนปิซ่า', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop' },
        { name: 'สะพานริอัลโต้', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop' },
        { name: 'วาติกัน', image: 'https://images.unsplash.com/photo-1552832230-c0197040d963?w=400&h=300&fit=crop' },
        { name: 'น้ำพุเทรวี่', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' },
        { name: 'แกลเลอรี่อุฟฟิซี่', image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=400&h=300&fit=crop' },
        { name: 'ซิงเคว่แตร์เร่', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop' },
        { name: 'ปอมเปอี', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00d93?w=400&h=300&fit=crop' },
        { name: 'ถ้ำบลูกร็อตโต้', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop' },
        { name: 'พันธีออน', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' },
        { name: 'สเปนิชสเต็ปส์', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' },
        { name: 'แคสเทิลซานต์แอนเจโล', image: 'https://images.unsplash.com/photo-1552832230-c0197040d963?w=400&h=300&fit=crop' },
        { name: 'ฟอรั่มโรมานุม', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop' },
        { name: 'ป่าลาซิโย้', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' },
        { name: 'แคมปิโดลิโอ', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('ปารีส')) {
      return [
        { name: 'หอไอเฟล', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop' },
        { name: 'ลูฟร์', image: 'https://images.unsplash.com/photo-1566417109221-1ad0d1a7b6de?w=400&h=300&fit=crop' },
        { name: 'นอเทรอดาม', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop' },
        { name: 'แชงป์เซลิเซ่', image: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=400&h=300&fit=crop' },
        { name: 'มงมาร์ตร์', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop' },
        { name: 'แวร์ไซส์', image: 'https://images.unsplash.com/photo-1566417109221-1ad0d1a7b6de?w=400&h=300&fit=crop' },
        { name: 'ซีนริเวอร์', image: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=400&h=300&fit=crop' },
        { name: 'ลาติน ควอเตอร์', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop' },
        { name: 'ปองนือฟ', image: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=400&h=300&fit=crop' },
        { name: 'อาร์กเดอทริออมฟ์', image: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=400&h=300&fit=crop' },
        { name: 'ซาเครอเกอร์', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop' },
        { name: 'ปาเลดูลูฟร์', image: 'https://images.unsplash.com/photo-1566417109221-1ad0d1a7b6de?w=400&h=300&fit=crop' },
        { name: 'ตุยเลรี่ส์การ์เด้น', image: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=400&h=300&fit=crop' },
        { name: 'มูแลงรูจ้', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop' },
        { name: 'มาเรส์ดิสทริค', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('เมดิเตอร์เรเนียน')) {
      return [
        { name: 'ซานโตรินี่', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop' },
        { name: 'มิโคนอส', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' },
        { name: 'โครเอเชีย', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop' },
        { name: 'คอสตาบราวา', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop' },
        { name: 'มอลต้า', image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400&h=300&fit=crop' },
        { name: 'ซิซิลี่', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop' },
        { name: 'คอร์ซิกา', image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400&h=300&fit=crop' },
        { name: 'ไซปรัส', image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400&h=300&fit=crop' },
        { name: 'มาจอก้า', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop' },
        { name: 'อิบิซา่', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop' },
        { name: 'โรดส์', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' },
        { name: 'ครีท', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' },
        { name: 'เซฟาโลเนีย', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' },
        { name: 'พาโรส', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' },
        { name: 'นาซอส', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop' }
      ];
    } else if (title.includes('อิตาลี') || title.includes('โรม')) {
      return [
        { name: 'โคลอสเซียม', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=95' },
        { name: 'หอเอนปิซ่า', image: 'https://images.unsplash.com/photo-1544737151406-6c18c0d39b81?w=1200&q=95' },
        { name: 'สะพานริอัลโต้', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95' },
        { name: 'วาติกัน', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=95' },
        { name: 'น้ำพุเทรวี่', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=95' },
        { name: 'แกลเลอรี่อุฟฟิซี่', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=95' },
        { name: 'ซิงเคว่แตร์เร่', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=95' },
        { name: 'ปอมเปอี', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73862?w=1200&q=95' },
        { name: 'ถ้ำบลูกร็อตโต้', image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1200&q=95' },
        { name: 'พันธีออน', image: 'https://images.unsplash.com/photo-1548585744-c2c347f48b4e?w=1200&q=95' },
        { name: 'สเปนิชสเต็ปส์', image: 'https://images.unsplash.com/photo-1555507036-ab94f84bfae7?w=1200&q=95' },
        { name: 'แคสเทิลซานต์แอนเจโล', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=95' },
        { name: 'ฟอรั่มโรมานุม', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' },
        { name: 'ป่าลาซิโย้', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'แคมปิโดลิโอ', image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=1200&q=95' }
      ];
    } else {
      // Fallback landmarks
      return [
        { name: 'หลายเมืองน่าเที่ยว', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=95' },
        { name: 'สถานที่สำคัญ', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95' },
        { name: 'ประสบการณ์พิเศษ', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95' },
        { name: 'ความทรงจำดี', image: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=1200&q=95' },
        { name: 'การผจญภัย', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95' }
      ];
    }
  };
  
  const landmarks = getLandmarks(destinationTitle);
  
  // Auto slide every 3 seconds 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % landmarks.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [landmarks.length]);

  // Notify parent when index changes
  useEffect(() => {
    if (onIndexChange && landmarks.length > 0 && landmarks[currentIndex]) {
      // Use setTimeout to avoid updating parent during render
      const timer = setTimeout(() => {
        onIndexChange(currentIndex, landmarks[currentIndex]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onIndexChange, landmarks]);
  

  // Simple reorder array approach (ไปกลับมาใช้วิธีเดิมก่อน)
  const getReorderedLandmarks = () => {
    if (landmarks.length === 0) return [];
    
    const reordered = [];
    for (let i = 0; i < landmarks.length; i++) {
      const index = (currentIndex + i) % landmarks.length;
      reordered.push({ ...landmarks[index], originalIndex: index });
    }
    return reordered;
  };

  const reorderedLandmarks = getReorderedLandmarks();

  return (
    <div 
      className="relative w-full overflow-x-auto" 
      style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="flex gap-2 pb-1 pl-1 pr-4">
        {reorderedLandmarks.map((landmark, displayIndex) => (
          <div 
            key={`${landmark.originalIndex}-${currentIndex}`}
            className="landmark-item inline-block px-3 py-1 rounded-lg text-sm whitespace-nowrap flex-shrink-0"
            style={{
              opacity: displayIndex === 0 ? 1 : 0.75,
              transform: `scale(${displayIndex === 0 ? 1.05 : 0.95})`,
              transformOrigin: 'center',
              background: displayIndex === 0 
                ? 'linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))'
                : 'rgb(243, 244, 246)',
              color: displayIndex === 0 ? 'white' : 'rgb(75, 85, 99)',
              fontWeight: displayIndex === 0 ? 'bold' : '500',
              boxShadow: displayIndex === 0 ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
              transition: 'all 0.5s ease-out'
            }}
          >
            {landmark.name}
          </div>
        ))}
      </div>
    </div>
  );
};


// Simple auto-expand hook without CardExpansionContext
const useAutoExpand = (threshold = 6000, enabled = true) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();
  const elementRef = useRef<HTMLDivElement>(null);
  const cardId = useRef(`card_${Math.random().toString(36).substr(2, 9)}`);
  const cardTimestamp = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInViewport = entry.isIntersecting && entry.intersectionRatio > 0.6;
          const isCompletelyOut = entry.intersectionRatio === 0;
          setIsInView(isInViewport);
          
          if (isInViewport) {
            const currentTime = Date.now();
            
            if (cardTimestamp.current === 0) {
              cardTimestamp.current = currentTime;
            }
            
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              currentExpandingCard = cardId.current;
              expandingCardTimestamp = cardTimestamp.current;
              setIsFocused(true);
            } else {
              setIsFocused(false);
            }
            
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              const startTime = Date.now();
              
              const animateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressPercent = Math.min((elapsed / threshold) * 100, 100);
                
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setProgress(progressPercent);
                  
                  if (progressPercent < 100) {
                    progressRef.current = requestAnimationFrame(animateProgress);
                  }
                } else {
                  setProgress(0);
                }
              };
              
              progressRef.current = requestAnimationFrame(animateProgress);

              timerRef.current = setTimeout(() => {
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setIsExpanded(true);
                  setProgress(100);
                }
              }, threshold);
            }
          } else if (isCompletelyOut) {
            setIsFocused(false);
            setProgress(0);
            
            if (isExpanded) {
              setIsExpanded(false);
              if (currentExpandingCard === cardId.current) {
                currentExpandingCard = null;
                expandingCardTimestamp = 0;
              }
            }
            
            if (currentExpandingCard === cardId.current) {
              currentExpandingCard = null;
              expandingCardTimestamp = 0;
            }
            
            cardTimestamp.current = 0;
            
            if (timerRef.current) clearTimeout(timerRef.current);
            if (progressRef.current) cancelAnimationFrame(progressRef.current);
          } else if (!entry.isIntersecting) {
            if (!isExpanded && progress > 0) {
              setProgress(0);
              setIsFocused(false);
              if (currentExpandingCard === cardId.current) {
                currentExpandingCard = null;
                expandingCardTimestamp = 0;
              }
              if (timerRef.current) clearTimeout(timerRef.current);
              if (progressRef.current) cancelAnimationFrame(progressRef.current);
            }
          }
        });
      },
      { threshold: [0, 0.1, 0.6] }
    );

    observer.observe(elementRef.current);

    return () => {
      if (currentExpandingCard === cardId.current) {
        currentExpandingCard = null;
        expandingCardTimestamp = 0;
      }
      cardTimestamp.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      observer.disconnect();
    };
  }, [threshold, enabled]);

  const toggleExpand = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    
    if (!isExpanded) {
      currentExpandingCard = cardId.current;
    } else {
      if (currentExpandingCard === cardId.current) {
        currentExpandingCard = null;
      }
    }
    
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setProgress(0);
    }, 50);
  }, [isExpanded]);

  return { isExpanded, progress, isInView, isFocused, elementRef, toggleExpand, setIsExpanded };
};

interface Prototype7TourCardProps {
  tour: SearchIndexTour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Prototype 7: 3D Flip Card (Pre-Program to Full Version)
const ExactTourCard: React.FC<Prototype7TourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  // Enable auto-expand to get isInView working
  const { isExpanded, progress, isInView, isFocused, elementRef, toggleExpand } = useAutoExpand(5000, false);
  
  // Travel Periods Modal State
  const [showTravelModal, setShowTravelModal] = useState(false);
  const [currentVisibleMonth, setCurrentVisibleMonth] = useState('ตุลาคม 2568');
  // Simplified state - only countdown timer
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [currentLandmarkImage, setCurrentLandmarkImage] = useState<string>('');
  
  const handleLandmarkChange = (index: number, landmark: { name: string; image?: string }) => {
    console.log('🏷️ Landmark changing to:', landmark.name, 'with image:', landmark.image);
    if (landmark.image) {
      setCurrentLandmarkImage(landmark.image);
      console.log('🖼️ Updated currentLandmarkImage to:', landmark.image);
    }
  };
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  // Country list for slot machine - only popular countries that definitely have tours
  const countries = [
    'ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'จีน', 'สิงคโปร์', 'มาเลเซีย', 
    'ฮ่องกง', 'ไทย', 'อินโดนีเซีย', 'เวียดนาม', 'กัมพูชา',
    'ตุรกี', 'กรีซ', 'อิตาลี', 'ฝรั่งเศส', 'เยอรมนี', 
    'สวิสเซอร์แลนด์', 'ออสเตรีย', 'นอร์เวย์', 'ไอซ์แลนด์'
  ];
  
  // Check if this is a flash sale (discount > 15%) or regular tour
  const isFlashSale = hasDiscount && tour.pricing.discount_percentage > 15;
  
  // Debug: แสดงสำหรับทุกการ์ดเพื่อทดสอบ clickbait text
  const showClickbaitText = true; // Force show clickbait text for testing

  // Flash Sale countdown timer
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = React.useState('01:00:00');
  const [flashSaleTimeRemaining, setFlashSaleTimeRemaining] = React.useState({ hours: 1, minutes: 0, seconds: 0 });
  const [showColon, setShowColon] = React.useState(true);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isFlashSale) return;

    // Initialize start time and random duration for each card
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
      
      // Generate unique random duration for each card based on tour ID
      const uniqueKey = tour?.id || tour?.code || destinationInfo?.title || Math.random().toString();
      let hash = 0;
      for (let i = 0; i < uniqueKey.length; i++) {
        const char = uniqueKey.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      
      // Random duration between 20 minutes to 6 hours (consistent per card)
      const minDuration = 20 * 60 * 1000; // 20 minutes
      const maxDuration = 6 * 60 * 60 * 1000; // 6 hours
      const randomDuration = minDuration + (Math.abs(hash) % (maxDuration - minDuration));
      
      // Set end time for this card
      tour.flashSaleEndTime = startTimeRef.current + randomDuration;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const remaining = Math.max(0, tour.flashSaleEndTime - now);
      
      if (remaining <= 0) {
        // Time's up! Reset with new random time
        const uniqueKey = tour?.id || tour?.code || destinationInfo?.title || Math.random().toString();
        let hash = 0;
        for (let i = 0; i < uniqueKey.length; i++) {
          const char = uniqueKey.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        
        const minDuration = 20 * 60 * 1000;
        const maxDuration = 6 * 60 * 60 * 1000;
        const randomDuration = minDuration + (Math.abs(hash + now) % (maxDuration - minDuration));
        tour.flashSaleEndTime = now + randomDuration;
      }
      
      const finalRemaining = Math.max(0, tour.flashSaleEndTime - now);
      const hours = Math.floor(finalRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((finalRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((finalRemaining % (1000 * 60)) / 1000);
      
      // Update both string and object states
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setFlashSaleTimeRemaining({ hours, minutes, seconds });
      
      return timeString;
    };

    const timer = setInterval(() => {
      setFlashSaleTimeLeft(calculateTimeLeft());
      setShowColon(false); // Hide colon briefly when second changes
      setTimeout(() => {
        setShowColon(true); // Show colon again after 100ms
      }, 100);
    }, 1000);

    setFlashSaleTimeLeft(calculateTimeLeft()); // Set initial value

    return () => clearInterval(timer);
  }, [isFlashSale]);







  // Extract destination data array for matching
  const getDestinationData = () => {
    return [
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์กรีซ 7 วัน 6 คืน เกาะสวรรค์ทะเลสีฟ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=95",
        title: "ทัวร์บาหลี 5 วัน 4 คืน เกาะแห่งเทพเจ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=95",
        title: "ทัวร์แคนาดา 8 วัน 6 คืน ธรรมชาติสุดแสนงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95",
        title: "ทัวร์สวิสเซอร์แลนด์ 9 วัน 7 คืน แอลป์ยอดหิมะ"
      },
      {
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=95",
        title: "ทัวร์มัลดีฟส์ 4 วัน 3 คืน รีสอร์ท 5 ดาว"
      },
      {
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=95",
        title: "ทัวร์ญี่ปุ่น 6 วัน 4 คืน ซากุระบานฤดูใบไม้ผลิ"
      },
      {
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95",
        title: "ทัวร์ไอซ์แลนด์ 8 วัน 6 คืน ล่าแสงเหนือออโรรา"
      },
      {
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=95",
        title: "ทัวร์นอร์เวย์ 10 วัน 8 คืน ฟยอร์ดสุดแสนจะงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์โลฟเทนไอส์แลนด์ 7 วัน 5 คืน เกาะลับแห่งนอร์เวย์"
      },
      {
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=95",
        title: "ทัวร์เยอรมนี 8 วัน 6 คืน ปราสาทโนอิชวานชไตน์"
      },
      {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=95",
        title: "ทัวร์นิวซีแลนด์ 9 วัน 7 คืน แดนแห่งหนังโฮบบิท"
      },
      {
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=95",
        title: "ทัวร์กัมพูชา 4 วัน 3 คืน นครวัดปราสาทเขมร"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์ตุรกี 8 วัน 6 คืน บอลลูนคัปปาโดเกีย"
      },
      {
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=95",
        title: "ทัวร์ออสเตรีย 8 วัน 6 คืน เมืองแห่งดนตรี"
      },
      {
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=95",
        title: "ทัวร์ปราก เช็ก 7 วัน 5 คืน เมืองแห่งปราสาท"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์ทัสคานี อิตาลี 8 วัน 6 คืน ไร่องุ่นและไวน์"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์แคนาดาตะวันออก 9 วัน 7 คืน ใบไม้เปลี่ยนสี"
      },
      {
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95",
        title: "ทัวร์โรม อิตาลี 6 วัน 4 คืน เมืองนิรันดร์"
      },
      {
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&q=95",
        title: "ทัวร์ปารีส ฝรั่งเศส 7 วัน 5 คืน เมืองแห่งแสง"
      },
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์เมดิเตอร์เรเนียน 10 วัน 8 คืน เกาะ 3 ประเทศ"
      }
    ];
  };

  // Generate unique image and title for each tour
  const getUniqueImageAndTitle = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Tour ads titles matched with destination images
    const destinationData = [
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์กรีซ 7 วัน 6 คืน เกาะสวรรค์ทะเลสีฟ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=95",
        title: "ทัวร์บาหลี 5 วัน 4 คืน เกาะแห่งเทพเจ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=95",
        title: "ทัวร์แคนาดา 8 วัน 6 คืน ธรรมชาติสุดแสนงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95",
        title: "ทัวร์สวิสเซอร์แลนด์ 9 วัน 7 คืน แอลป์ยอดหิมะ"
      },
      {
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=95",
        title: "ทัวร์มัลดีฟส์ 4 วัน 3 คืน รีสอร์ท 5 ดาว"
      },
      {
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=95",
        title: "ทัวร์ญี่ปุ่น 6 วัน 4 คืน ซากุระบานฤดูใบไม้ผลิ"
      },
      {
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95",
        title: "ทัวร์ไอซ์แลนด์ 8 วัน 6 คืน ล่าแสงเหนือออโรรา"
      },
      {
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=95",
        title: "ทัวร์นอร์เวย์ 10 วัน 8 คืน ฟยอร์ดสุดแสนจะงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์โลฟเทนไอส์แลนด์ 7 วัน 5 คืน เกาะลับแห่งนอร์เวย์"
      },
      {
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=95",
        title: "ทัวร์เยอรมนี 8 วัน 6 คืน ปราสาทโนอิชวานชไตน์"
      },
      {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=95",
        title: "ทัวร์นิวซีแลนด์ 9 วัน 7 คืน แดนแห่งหนังโฮบบิท"
      },
      {
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=95",
        title: "ทัวร์กัมพูชา 4 วัน 3 คืน นครวัดปราสาทเขมร"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์ตุรกี 8 วัน 6 คืน บอลลูนคัปปาโดเกีย"
      },
      {
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=95",
        title: "ทัวร์ออสเตรีย 8 วัน 6 คืน เมืองแห่งดนตรี"
      },
      {
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=95",
        title: "ทัวร์ปราก เช็ก 7 วัน 5 คืน เมืองแห่งปราสาท"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์ทัสคานี อิตาลี 8 วัน 6 คืน ไร่องุ่นและไวน์"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์แคนาดาตะวันออก 9 วัน 7 คืน ใบไม้เปลี่ยนสี"
      },
      {
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95",
        title: "ทัวร์โรม อิตาลี 6 วัน 4 คืน เมืองนิรันดร์"
      },
      {
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&q=95",
        title: "ทัวร์ปารีส ฝรั่งเศส 7 วัน 5 คืน เมืองแห่งแสง"
      },
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์เมดิเตอร์เรเนียน 10 วัน 8 คืน เกาะ 3 ประเทศ"
      }
    ];
    
    // Cycle through programs based on tour ID
    const selectedIndex = tourIdHash % 20;
    return destinationData[selectedIndex];
  };

  // Get the destination data for this tour (image and title)
  const destinationInfo = React.useMemo(() => {
    return getUniqueImageAndTitle();
  }, [tour.metadata.id]);

  // Get airline logo and country flag based on tour program
  const getAirlineAndFlag = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use Air Asia for some programs (roughly 30% of tours)
    const useAirAsia = tourIdHash % 10 < 3;
    
    // Map destinations to country codes based on tour program titles
    const getCountryCodeFromTitle = (title: string) => {
      // Extract country information from tour title
      if (title.includes('กรีซ') || title.includes('เกาะสวรรค์ทะเลสีฟ้า')) return 'gr';
      if (title.includes('บาหลี') || title.includes('เกาะแห่งเทพเจ้า')) return 'id';
      if (title.includes('แคนาดา') || title.includes('ธรรมชาติสุดแสนงาม')) return 'ca';
      if (title.includes('สวิสเซอร์แลนด์') || title.includes('แอลป์ยอดหิมะ')) return 'ch';
      if (title.includes('มัลดีฟส์') || title.includes('รีสอร์ท')) return 'mv';
      if (title.includes('ญี่ปุ่น') || title.includes('ซากุระ') || title.includes('โฮบบิท')) return 'jp';
      if (title.includes('ไอซ์แลนด์') || title.includes('ออโรรา') || title.includes('แสงเหนือ')) return 'is';
      if (title.includes('นอร์เวย์') || title.includes('ฟยอร์ด') || title.includes('โลฟเทน')) return 'no';
      if (title.includes('เยอรมนี') || title.includes('ปราสาทโน') || title.includes('นอิชวานชไตน์')) return 'de';
      if (title.includes('นิวซีแลนด์') || title.includes('โฮบบิท')) return 'nz';
      if (title.includes('กัมพูชา') || title.includes('นครวัด') || title.includes('เขมร')) return 'kh';
      if (title.includes('ตุรกี') || title.includes('บอลลูน') || title.includes('คัปปาโดเกีย')) return 'tr';
      if (title.includes('ออสเตรีย') || title.includes('เมืองแห่งดนตรี')) return 'at';
      if (title.includes('ปราก') || title.includes('เช็ก') || title.includes('เมืองแห่งปราสาท')) return 'cz';
      if (title.includes('ทัสคานี') || title.includes('อิตาลี') || title.includes('ไร่องุ่น') || title.includes('ไวน์')) return 'it';
      if (title.includes('โรม') || title.includes('เมืองนิรันดร์')) return 'it';
      if (title.includes('ปารีส') || title.includes('ฝรั่งเศส') || title.includes('เมืองแห่งแสง')) return 'fr';
      if (title.includes('เมดิเตอร์เรเนียน') || title.includes('เกาะ 3 ประเทศ')) return 'gr'; // Mediterranean typically associated with Greece
      
      // Fallback to country field if title doesn't contain specific info
      const country = tour.location.country;
      switch (country) {
        case 'ญี่ปุ่น': return 'jp';
        case 'เกาหลีใต้': return 'kr';
        case 'ไต้หวัน': return 'tw';
        case 'ยุโรป': return 'eu';
        case 'จีน': return 'cn';
        case 'สิงคโปร์': return 'sg';
        case 'มาเลเซีย': return 'my';
        case 'ฮ่องกง': return 'hk';
        case 'ไทย': return 'th';
        case 'อินโดนีเซีย': return 'id';
        case 'ฟิลิปปินส์': return 'ph';
        case 'เวียดนาม': return 'vn';
        case 'กัมพูชา': return 'kh';
        case 'ลาว': return 'la';
        case 'เมียนมาร์': return 'mm';
        case 'บรูไน': return 'bn';
        case 'อินเดีย': return 'in';
        case 'ศรีลังกา': return 'lk';
        case 'เนปาล': return 'np';
        case 'ปากีสถาน': return 'pk';
        case 'บังกลาเทศ': return 'bd';
        case 'อัฟกานิสถาน': return 'af';
        case 'อิหร่าน': return 'ir';
        case 'ตุรกี': return 'tr';
        case 'กรีซ': return 'gr';
        case 'อิตาลี': return 'it';
        case 'ฝรั่งเศส': return 'fr';
        case 'เยอรมนี': return 'de';
        case 'สเปน': return 'es';
        case 'โปรตุเกส': return 'pt';
        case 'สหราชอาณาจักร': return 'gb';
        case 'ไอร์แลนด์': return 'ie';
        case 'เนเธอร์แลนด์': return 'nl';
        case 'เบลเยียม': return 'be';
        case 'สวิสเซอร์แลนด์': return 'ch';
        case 'ออสเตรีย': return 'at';
        case 'เช็ก': return 'cz';
        case 'โปแลนด์': return 'pl';
        case 'ฮังการี': return 'hu';
        case 'โรมาเนีย': return 'ro';
        case 'บัลแกเรีย': return 'bg';
        case 'นอร์เวย์': return 'no';
        case 'สวีเดน': return 'se';
        case 'ฟินแลนด์': return 'fi';
        case 'เดนมาร์ก': return 'dk';
        case 'ไอซ์แลนด์': return 'is';
        case 'รัสเซีย': return 'ru';
        case 'สหรัฐอเมริกา': return 'us';
        case 'แคนาดา': return 'ca';
        case 'เม็กซิโก': return 'mx';
        case 'บราซิล': return 'br';
        case 'อาร์เจนตินา': return 'ar';
        case 'เปรู': return 'pe';
        case 'ชิลี': return 'cl';
        case 'โคลอมเบีย': return 'co';
        case 'เวเนซุเอลา': return 've';
        case 'ออสเตรเลีย': return 'au';
        case 'นิวซีแลนด์': return 'nz';
        case 'แอฟริกาใต้': return 'za';
        case 'อียิปต์': return 'eg';
        case 'โมร็อกโก': return 'ma';
        default: return 'th'; // Default to Thailand
      }
    };
    
    return {
      airlineLogo: useAirAsia ? "/icons/airlines/air-asia.svg" : "/icons/airlines/thai-airways.svg",
      airlineAlt: useAirAsia ? "Air Asia" : "Thai Airways",
      flagIcon: `/icons/destinations/flag-icons-main/flags/4x3/${getCountryCodeFromTitle(destinationInfo.title)}.svg`,
      flagAlt: `${destinationInfo.title.split(' ')[1] || 'Country'} Flag`
    };
  };

  const airlineAndFlagInfo = React.useMemo(() => {
    return getAirlineAndFlag();
  }, [tour.metadata.id, destinationInfo.title]);

  // Mock data for airline and travel period since it's not in tour object
  const getAirlineInfo = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'Thai Airways (TG)';
      case 'เกาหลีใต้': return 'Korean Air (KE)';
      case 'ไต้หวัน': return 'EVA Air (BR)';
      case 'ยุโรป': return 'Emirates (EK)';
      case 'จีน': return 'China Airlines (CI)';
      case 'สิงคโปร์': return 'Singapore Airlines (SQ)';
      case 'มาเลเซีย': return 'Malaysia Airlines (MH)';
      case 'ฮ่องกง': return 'Cathay Pacific (CX)';
      default: return 'Thai Airways (TG)';
    }
  };

  const getAirlineCode = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'TG';
      case 'เกาหลีใต้': return 'KE';
      case 'ไต้หวัน': return 'BR';
      case 'ยุโรป': return 'EK';
      case 'จีน': return 'CI';
      case 'สิงคโปร์': return 'SQ';
      case 'มาเลเซีย': return 'MH';
      case 'ฮ่องกง': return 'CX';
      default: return 'TG';
    }
  };

  const getTravelPeriod = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'ก.ย. 68 – เม.ย. 69';
      case 'เกาหลีใต้': return 'ต.ค. 68 – มี.ค. 69';
      case 'ไต้หวัน': return 'ก.ย. 68 – ก.พ. 69';
      case 'ยุโรป': return 'เม.ย. 68 – ต.ค. 68';
      case 'จีน': return 'ตลอดปี';
      case 'สิงคโปร์': return 'ตลอดปี';
      case 'มาเลเซีย': return 'ตลอดปี';
      case 'ฮ่องกง': return 'ต.ค. 68 – เม.ย. 69';
      default: return 'ก.ย. 68 – ก.พ. 69';
    }
  };

  return (
    <>
      <FlashSaleBorderStyles />
      <div ref={elementRef} className="card-container relative mb-2.5 sm:mb-6" style={{ zIndex: 1 }}>
      {/* 3D Flip Container */}
      <div 
        className="relative w-full h-auto"
        style={{ 
          perspective: '1000px',
          minHeight: '500px'
        }}
      >
        <div 
          className={`
            relative w-full transition-all duration-700 preserve-3d
            ${isExpanded ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isExpanded ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          
          {/* Front Face - Pre-Program */}
          <div 
            className={`
              relative w-full backface-hidden
              ${isExpanded ? 'rotate-y-180' : ''}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: isExpanded ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            <div className={`group bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer relative ${
              isFlashSale ? 'flash-sale-border' : 'regular-border'
            }`}>
              {/* Simplified Hover Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-200 pointer-events-none rounded-xl"></div>
              
              {/* Seamless Layout - Image with Integrated Content */}
              <div className={`relative min-h-[500px] md:min-h-[550px] overflow-hidden flex flex-col`} onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                
                {/* Image Section - Increased Height */}
                <div className="relative w-full h-96 overflow-hidden">
                  <img
                    src={currentLandmarkImage || destinationInfo.image}
                    alt={destinationInfo.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105`}
                    onLoad={() => console.log('🖼️ Image loaded:', currentLandmarkImage || destinationInfo.image)}
                  />
                  {/* Seamless gradient overlay that blends into content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-gray-50"></div>
                  
                  {/* Tour Code Badge - Top Right */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg border border-gray-200/50">
                      <p className="text-xs font-bold text-gray-700 tracking-wider">
                        TW{(() => {
                          // Generate 5-digit code based on tour ID hash
                          const hash = (tour?.metadata?.id || 'default').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                          const code = String(10000 + (hash % 90000)).padStart(5, '0');
                          return code;
                        })()}
                      </p>
                    </div>
                  </div>
                  
                </div>
                
                {/* Content Section - No Gap */}
                <div className="flex-1 px-0 py-0 bg-gray-50 relative z-10">
                  {/* Title - Hidden */}
                  <div className="hidden mb-3 text-center relative">
                    <div className="absolute inset-0 bg-black/30 blur-xl scale-110 rounded-xl"></div>
                    <h2 className="text-white text-lg md:text-xl font-black text-center leading-tight relative z-10 px-4 py-2">
                      <span className="drop-shadow-2xl bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">
                        {destinationInfo.title}
                      </span>
                    </h2>
                  </div>
                  
                  {/* Clean Card with 7 Required Data Points - Symmetrical Zigzag Ticket Style */}
                  <div className="relative shadow-2xl">
                    <div className="bg-white/85 backdrop-blur-sm relative overflow-hidden rounded-xl">
                      
                      {/* Special Header */}
                      <div className={`${isFlashSale ? 'bg-red-600' : 'bg-blue-600'} text-white px-4 py-2 relative`}>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold tracking-wide">
                              {isFlashSale ? (
                                <div className="flex items-center gap-2">
                                  <span>⚡ Flash Sale เหลือเวลา</span>
                                  <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">
                                    {String(flashSaleTimeRemaining.hours).padStart(2, '0')}
                                    <span className={`${showColon ? 'opacity-100' : 'opacity-0'}`}>:</span>
                                    {String(flashSaleTimeRemaining.minutes).padStart(2, '0')}
                                    <span className={`${showColon ? 'opacity-100' : 'opacity-0'}`}>:</span>
                                    {String(flashSaleTimeRemaining.seconds).padStart(2, '0')}
                                  </span>
                                </div>
                              ) : (
                                (() => {
                                  try {
                                    const title = destinationInfo?.title || tour?.title || '';
                                    if (title.includes('กรีซ')) return '🌊  เกาะสวรรค์สีฟ้าใส ถ่ายรูปปังสุดในชีวิต!';
                                    if (title.includes('บาหลี')) return '🕉️  ดินแดนเทพเจ้า บินดึกถึงเช้า เที่ยวได้จุใจ!';
                                    if (title.includes('แคนาดา')) return '🍁  ใบไม้เปลี่ยนสีสุดอลังการ มหัศจรรย์ที่ต้องเห็น!';
                                    if (title.includes('สวิสเซอร์แลนด์')) return '🏔️  ทัวร์สวิส! ขึ้นเขามาเทอร์ฮอร์น สุดฟิน!';
                                    
                                    // สุ่มข้อความ clickbait ที่แตกต่างกัน
                                    const clickbaitTexts = [
                                      '🎯  จองเลย! ที่นั่งจำกัด โปรนี้หาไม่ได้อีก!',
                                      '✈️  บินดึก เที่ยวฟินได้ทั้งวัน คุ้มค่าสุดๆ!',
                                      '🌟  ทัวร์ดัง! ไปเที่ยวสบายเกินคาด!',
                                      '🔥  ไม่จองแล้วจะเสียใจ ราคานี้หาไม่ได้อีก!',
                                      '💫  ทัวร์โดนใจ! เที่ยวหรูแบบประหยัด!',
                                      '🎊  จองวันนี้ได้เปรียบ ทัวร์เด็ดราคาดี!',
                                      '⚡  เที่ยวแบบชิล! ไปได้ไม่ต้องรอ!',
                                      '🎁  ทัวร์คุณภาพ! โปรโมชั่นสุดคุ้ม!',
                                      '🌈  ทริปในฝัน! ความทรงจำไม่มีราคา!',
                                      '💎  ทัวร์ลักซ์ชูรี่! ราคาเบาๆ เท่านั้น!'
                                    ];
                                    
                                    // ใช้ tour code หรือ title hash เพื่อให้การ์ดแต่ละใบได้ข้อความที่แตกต่างกันแต่คงเดิม
                                    const uniqueKey = tour?.id || tour?.code || title || Math.random().toString();
                                    // สร้าง hash จาก string ทั้งหมดเพื่อให้ unique มากขึ้น
                                    let hash = 0;
                                    for (let i = 0; i < uniqueKey.length; i++) {
                                      const char = uniqueKey.charCodeAt(i);
                                      hash = ((hash << 5) - hash) + char;
                                      hash = hash & hash; // Convert to 32-bit integer
                                    }
                                    const index = Math.abs(hash) % clickbaitTexts.length;
                                    return clickbaitTexts[index];
                                  } catch (error) {
                                    return '🎯 ลุ้นของดี! ติดหวันหยุดยาว จองเลยคุ้มสุด!';
                                  }
                                })()
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* World-Class UX/UI Best Practices Design */}
                      <div className="px-5 py-5 relative overflow-hidden">
                        
                        {/* Sophisticated Brand Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/5 to-gray-50/10"></div>
                        
                        {/* Airbnb-inspired Content Hierarchy */}
                        <div className="relative z-10 space-y-4">
                          
                          {/* Price Leadership Section - Booking.com Style */}
                          <div className="space-y-3">
                            {/* Country Row - Full Width Merged */}
                            <div className="flex items-center gap-2 relative">
                              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                <img 
                                  src={airlineAndFlagInfo.flagIcon}
                                  alt={airlineAndFlagInfo.flagAlt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-gray-950 text-base">
                                {(() => {
                                  const title = destinationInfo.title;
                                  if (title.includes('กรีซ')) return 'กรีซ';
                                  if (title.includes('บาหลี')) return 'อินโดนีเซีย';
                                  if (title.includes('แคนาดา')) return 'แคนาดา';
                                  if (title.includes('สวิสเซอร์แลนด์')) return 'สวิสเซอร์แลนด์';
                                  if (title.includes('มัลดีฟส์')) return 'มัลดีฟส์';
                                  if (title.includes('ญี่ปุ่น')) return 'ญี่ปุ่น';
                                  if (title.includes('ไอซ์แลนด์')) return 'ไอซ์แลนด์';
                                  if (title.includes('นอร์เวย์')) return 'นอร์เวย์';
                                  if (title.includes('โลฟเทน')) return 'นอร์เวย์';
                                  if (title.includes('เยอรมนี')) return 'เยอรมนี';
                                  if (title.includes('นิวซีแลนด์')) return 'นิวซีแลนด์';
                                  if (title.includes('กัมพูชา')) return 'กัมพูชา';
                                  if (title.includes('ตุรกี')) return 'ตุรกี';
                                  if (title.includes('ออสเตรีย')) return 'ออสเตรีย';
                                  if (title.includes('ปราก')) return 'เช็ก';
                                  if (title.includes('ทัสคานี')) return 'อิตาลี';
                                  if (title.includes('โรม')) return 'อิตาลี';
                                  if (title.includes('ปารีส')) return 'ฝรั่งเศส';
                                  if (title.includes('เมดิเตอร์เรเนียน')) return 'กรีซ';
                                  return 'ไทย';
                                })()}
                              </span>
                              <div className="flex items-center gap-2 flex-wrap">
                                {(() => {
                                  const title = destinationInfo.title;
                                  let countries = [];
                                  if (title.includes('กรีซ')) countries = [
                                    { name: 'กรีซ', flag: '/icons/destinations/flag-icons-main/flags/4x3/gr.svg' },
                                    { name: 'อิตาลี', flag: '/icons/destinations/flag-icons-main/flags/4x3/it.svg' },
                                    { name: 'ตุรกี', flag: '/icons/destinations/flag-icons-main/flags/4x3/tr.svg' }
                                  ];
                                  else if (title.includes('บาหลี')) countries = [
                                    { name: 'อินโดนีเซีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/id.svg' },
                                    { name: 'สิงคโปร์', flag: '/icons/destinations/flag-icons-main/flags/4x3/sg.svg' },
                                    { name: 'มาเลเซีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/my.svg' }
                                  ];
                                  else if (title.includes('แคนาดา')) countries = [
                                    { name: 'แคนาดา', flag: '/icons/destinations/flag-icons-main/flags/4x3/ca.svg' },
                                    { name: 'อเมริกา', flag: '/icons/destinations/flag-icons-main/flags/4x3/us.svg' }
                                  ];
                                  else if (title.includes('สวิสเซอร์แลนด์')) countries = [
                                    { name: 'สวิสเซอร์แลนด์', flag: '/icons/destinations/flag-icons-main/flags/4x3/ch.svg' },
                                    { name: 'ออสเตรีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/at.svg' }
                                  ];
                                  else if (title.includes('มัลดีฟส์')) countries = [
                                    { name: 'มัลดีฟส์', flag: '/icons/destinations/flag-icons-main/flags/4x3/mv.svg' },
                                    { name: 'ศรีลังกา', flag: '/icons/destinations/flag-icons-main/flags/4x3/lk.svg' }
                                  ];
                                  else if (title.includes('ญี่ปุ่น')) countries = [
                                    { name: 'ญี่ปุ่น', flag: '/icons/destinations/flag-icons-main/flags/4x3/jp.svg' },
                                    { name: 'เกาหลีใต้', flag: '/icons/destinations/flag-icons-main/flags/4x3/kr.svg' }
                                  ];
                                  else countries = [
                                    { name: 'อิตาลี', flag: '/icons/destinations/flag-icons-main/flags/4x3/it.svg' },
                                    { name: 'วาติกัน', flag: '/icons/destinations/flag-icons-main/flags/4x3/va.svg' },
                                    { name: 'ฝรั่งเศส', flag: '/icons/destinations/flag-icons-main/flags/4x3/fr.svg' }
                                  ];

                                  return countries.slice(1).map((country, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                      <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img
                                          src={country.flag}
                                          alt={`${country.name} Flag`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <span className="font-medium text-gray-950 text-base">{country.name}</span>
                                    </div>
                                  ));
                                })()}
                              </div>
                            </div>

                            {/* Second Row - 2 Columns Layout */}
                            <div className="flex items-start relative">
                              {/* Left Column - Travel Details (60%) */}
                              <div className="text-left space-y-2 flex-[6]">
                                {/* Airline Row */}
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-white">
                                    <img 
                                      src={airlineAndFlagInfo.airlineLogo}
                                      alt={airlineAndFlagInfo.airlineAlt}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm">
                                    {(() => {
                                      const title = destinationInfo.title;
                                      if (title.includes('กรีซ')) return 'Turkish Airlines';
                                      if (title.includes('บาหลี')) return 'Garuda Indonesia';
                                      if (title.includes('แคนาดา')) return 'Air Canada';
                                      if (title.includes('สวิสเซอร์แลนด์')) return 'Swiss International';
                                      if (title.includes('มัลดีฟส์')) return 'Emirates';
                                      if (title.includes('ญี่ปุ่น')) return 'ANA';
                                      if (title.includes('ไอซ์แลนด์')) return 'Icelandair';
                                      if (title.includes('นอร์เวย์')) return 'SAS';
                                      if (title.includes('โลฟเทน')) return 'Norwegian Air';
                                      if (title.includes('เยอรมนี')) return 'Lufthansa';
                                      if (title.includes('นิวซีแลนด์')) return 'Air New Zealand';
                                      if (title.includes('กัมพูชา')) return 'Cambodia Angkor Air';
                                      if (title.includes('ตุรกี')) return 'Turkish Airlines';
                                      if (title.includes('ออสเตรีย')) return 'Austrian Airlines';
                                      if (title.includes('ปราก')) return 'Czech Airlines';
                                      if (title.includes('ทัสคานี')) return 'Alitalia';
                                      if (title.includes('โรม')) return 'ITA Airways';
                                      if (title.includes('ปารีส')) return 'Air France';
                                      if (title.includes('เมดิเตอร์เรเนียน')) return 'Aegean Airlines';
                                      return 'Emirates';
                                    })()}
                                  </p>
                                </div>

                                {/* Duration Row */}
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm">
                                    {tour.duration_days} วัน {tour.nights} คืน
                                  </p>
                                </div>

                                {/* Travel Period Row */}
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm flex items-center gap-2">
                                    <span>ก.ย. 68 - พ.ค. 69</span>
                                    <button 
                                      className="text-xs text-blue-600 hover:text-blue-800 underline transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowTravelModal(true);
                                      }}
                                    >
                                      ดูทั้งหมด
                                    </button>
                                  </p>
                                </div>
                              </div>

                              {/* Vertical divider */}
                              <div className="absolute left-[60%] top-0 bottom-0 w-px border-l border-dashed border-gray-300 transform -translate-x-1/2"></div>

                              {/* Right Column - Price Section (40%) */}
                              <div className="space-y-1 text-right flex-[4]">
                                {hasDiscount && (
                                  <div className="flex items-center gap-2 justify-end">
                                    <p className="text-xs font-semibold drop-shadow-sm text-gray-700">ราคาเริ่มต้น</p>
                                    <span className="text-sm line-through font-medium text-gray-800">฿{formatPrice(tour.pricing.original_price)}</span>
                                  </div>
                                )}
                                <div className="flex items-baseline gap-1 justify-end">
                                  <span className="text-2xl font-black leading-none drop-shadow-sm text-red-600">฿{formatPrice(tour.pricing.base_price)}</span>
                                </div>
                                {hasDiscount && (
                                  <div className="text-xs font-semibold relative text-green-600">
                                    <span className="relative inline-block">
                                      🎉 ประหยัดถึง ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                                      {/* Fireworks Animation from 🎉 emoji */}
                                      <div className="absolute top-0 left-0 pointer-events-none">
                                        <div className="emoji-firework emoji-firework-1">
                                          <div className="emoji-spark emoji-spark-1"></div>
                                          <div className="emoji-spark emoji-spark-2"></div>
                                          <div className="emoji-spark emoji-spark-3"></div>
                                          <div className="emoji-spark emoji-spark-4"></div>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Destinations - Clean Style */}
                          <div className="px-3 pt-0 pb-1.5" style={{ marginTop: '0px !important' }}>
                            <div className="flex items-center gap-2 text-sm mb-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700 tracking-wide">
                                <span className="text-blue-700 font-bold">{(() => {
                                  // Get the actual landmarks from the same function used in LandmarkTextSlider
                                  const getLandmarks = (title: string) => {
                                    if (title.includes('กรีซ')) {
                                      return [
                                        'อะโครโพลิส', 'บ้านสีขาวซานโตรินี่', 'กังหันลมมิโคนอส', 'ไอโดล เซนต์ นิโคลาส', 
                                        'วิลลา คนอสซอส', 'อ่าวนาวาจิโอ', 'โรงละครเอพิดอรัส', 'เมืองเก่าโรดส์',
                                        'หาดบาลอส', 'ถ้ำเมลิสซานี', 'วิลลา แอชิลเลียน', 'เมืองดิฟี้', 'ยอดเขาโอลิมปัส', 'ซามาเรีย โกร์จ'
                                      ];
                                    } else if (title.includes('บาหลี')) {
                                      return [
                                        'วัดเบซากีห์', 'นาขั้นบันไดเตกัลลาลัง', 'ประตูสวรรค์', 'วัดตานาห์ลอต', 'ป่าลิง',
                                        'ภูเขาไฟบาตูร์', 'วัดอูลูวาตู', 'หาดจิมบารัน', 'ตลาดอูบุด', 'วัดติร์ตา เอ็มปุล',
                                        'หาดกูตา', 'นูซา เปนิดา', 'หาดซานูร์', 'วัดลุมปูยัง', 'เซกุมปุล วอเตอร์ฟอล'
                                      ];
                                    } else if (title.includes('แคนาดา')) {
                                      return [
                                        'น้ำตกไนแอการา', 'ทะเลสาบหลุยส์', 'แบนฟ์นาชั่นแนลปาร์ค', 'โตรอนโตซีเอ็นทาวเวอร์', 'มอนทรีออลเก่า',
                                        'วิกตอเรียฮาร์เบอร์', 'เจสเพอร์', 'ควิเบกซิตี้', 'ออตตาวา', 'ปราสาทฟรอนเตแนค',
                                        'สแตนลีย์ปาร์ค', 'ทะเลสาบมอร์เรน', 'ไอซ์ฟิลด์ส พาร์กเวย์', 'จัสเปอร์สกายทราม', 'พระราชวังโรยัล'
                                      ];
                                    } else if (title.includes('เมดิเตอร์เรเนียน')) {
                                      return [
                                        'คอสตาบราวา', 'มอลต้า', 'ซิซิลี่', 'คอร์ซิกา', 'ไซปรัส', 'มาจอก้า', 'อิบิซา่',
                                        'โรดส์', 'ครีท', 'เซฟาโลเนีย', 'พาโรส', 'นาซอส', 'ซานโตรินี่', 'มิโคนอส', 'โครเอเชีย'
                                      ];
                                    } else {
                                      return ['แลนด์มาร์ก 1', 'แลนด์มาร์ก 2', 'แลนด์มาร์ก 3', 'แลนด์มาร์ก 4', 'แลนด์มาร์ก 5'];
                                    }
                                  };
                                  
                                  const landmarks = getLandmarks(destinationInfo.title);
                                  return landmarks.length;
                                })()}</span> แลนด์มาร์กทั้งหมด
                              </span>
                            </div>
                            <LandmarkTextSlider destinationTitle={destinationInfo.title} onIndexChange={handleLandmarkChange} />
                          </div>

                        </div>

                        {/* Premium Border Accent */}
                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
                        
                      </div>

                    </div>
                  </div>
                  
                  {/* CTA Text Link - Simple and Clean */}
                  {/* Promotion link hidden */}
                  <div className="hidden text-center">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200 group"
                    >
                      <span className="text-sm font-bold underline underline-offset-2">คลิกเพื่อดูโปรโมชั่น</span>
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{
                          animation: 'bounceX 1s ease-in-out infinite'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Back Face - Full Version */}
          <div 
            className={`
              absolute inset-0 w-full backface-hidden rotate-y-180
              ${isExpanded ? '' : 'rotate-y-0'}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-white rounded-xl border shadow-md border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Back to Pre-Program Button - Positioned below Wishlist */}
              <div className="absolute top-16 right-3 z-10">
                <button 
                  onClick={toggleExpand}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Full Card View */}
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {/* Image Section */}
                <div className="relative h-48 md:h-52">
                  <Image
                    src={tour.media.hero_image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {hasDiscount && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        ลดสูงสุด {tour.pricing.discount_percentage}%
                      </span>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle?.(tour.metadata.id);
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all flex items-center justify-center"
                      aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-blue-600" />
                      {tour.duration_days} วัน {tour.nights} คืน
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
                    {tour.title}
                  </h3>
                  
                  {/* Enhanced Location Info */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium">{tour.location.country}</span>
                    </div>
                    {tour.location.cities && tour.location.cities.length > 0 && (
                      <span className="text-gray-600">
                        {tour.location.cities.slice(0, 5).join(', ')}
                      </span>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                        {typeof highlight === 'string' ? highlight : highlight.text}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{tour.quality.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({tour.quality.review_count} รีวิว)</span>
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
                        <div className="font-medium">{getAirlineInfo(tour.location.country)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                        <div className="font-medium">{getTravelPeriod(tour.location.country)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          ฿{formatPrice(tour.pricing.original_price)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">
                        ฿{formatPrice(tour.pricing.base_price)}
                      </span>
                      <div className="text-xs text-gray-500">ต่อคน</div>
                      {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                        <div className="text-xs text-green-600 font-medium">
                          ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickBook?.(tour);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                      >
                        จองทันที
                      </button>
                      <Link href={tour.metadata.canonical_url}>
                        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                          ดูเพิ่มเติม
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    {/* Travel Periods Modal - Clean Mobile Design */}
    {showTravelModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white relative">
            <button 
              onClick={() => setShowTravelModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-xl font-bold">🗓️ เลือกวันเดินทาง</h3>
            <p className="text-blue-100 text-sm mt-1">{destinationInfo.title}</p>
          </div>
          
          
          {/* Modal Content */}
          <div 
            className="overflow-y-auto max-h-[60vh] p-4"
            onScroll={(e) => {
              // Update visible month based on scroll position
              const container = e.currentTarget;
              const cards = container.querySelectorAll('[data-period-month]');
              
              // Find first visible card
              const containerTop = container.scrollTop;
              const containerHeight = container.clientHeight;
              
              for (let card of cards) {
                const cardElement = card as HTMLElement;
                const cardTop = cardElement.offsetTop - container.offsetTop;
                const cardBottom = cardTop + cardElement.offsetHeight;
                
                // Check if card is visible in viewport
                if (cardTop <= containerTop + 100 && cardBottom >= containerTop) {
                  const month = cardElement.getAttribute('data-period-month');
                  if (month && month !== currentVisibleMonth) {
                    setCurrentVisibleMonth(month);
                    break;
                  }
                }
              }
            }}
          >

            
            {(() => {
              const getTravelDates = () => {
                const hash = (tour?.code || tour?.id || 'default').toString();
                const baseHash = hash.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
                
                const dates = [];
                const months = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.'];
                const daysInMonth = [31, 30, 31, 31, 28, 31, 30, 31]; // Days in each month (simplified)
                
                for (let i = 0; i < 12; i++) { // Show all periods
                  const monthIndex = i % months.length;
                  const startDay = 5 + (Math.abs((baseHash + i) % 20));
                  const duration = 2 + (Math.abs((baseHash + i * 7) % 6)); // 2-7 days duration
                  const available = Math.abs((baseHash + i * 3) % 30); // 0-29, some will be 0 (full)
                  const basePrice = 25000 + (Math.abs((baseHash + i * 2) % 8000));
                  const isAvailable = available > 0;
                  const isLimited = available > 0 && available <= 3;
                  
                  // Add promotional pricing
                  const discountPercent = 15 + (Math.abs((baseHash + i * 5) % 25)); // 15-40% discount
                  const originalPrice = Math.round(basePrice / (1 - discountPercent / 100));
                  const hasPromo = Math.abs((baseHash + i * 4) % 10) > 6; // 30% chance of promo
                  
                  // Calculate end date
                  let endDay = startDay + duration;
                  let endMonthIndex = monthIndex;
                  
                  // Handle month overflow
                  if (endDay > daysInMonth[monthIndex]) {
                    endDay = endDay - daysInMonth[monthIndex];
                    endMonthIndex = (monthIndex + 1) % months.length;
                  }
                  
                  // Format date range
                  const startDate = `${startDay} ${months[monthIndex]} 68`;
                  const endDate = `${endDay} ${months[endMonthIndex]} 68`;
                  const dateRange = endMonthIndex === monthIndex 
                    ? `${startDay} - ${endDay} ${months[monthIndex]} 68`
                    : `${startDate} - ${endDate}`;
                  
                  dates.push({
                    date: dateRange,
                    duration: duration,
                    available: isAvailable ? available : 0,
                    status: !isAvailable ? 'full' : (isLimited ? 'limited' : 'available'),
                    price: basePrice,
                    originalPrice: hasPromo ? originalPrice : null,
                    discount: hasPromo ? discountPercent : null
                  });
                }
                
                return dates;
              };
              
              return getTravelDates().map((trip, index) => {
                // Get month name from trip date for scroll tracking
                const monthName = (() => {
                  const months = ['ตุลาคม', 'พฤศจิกายน', 'ธันวาคม', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'];
                  const shortMonths = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.'];
                  
                  for (let i = 0; i < shortMonths.length; i++) {
                    if (trip.date.includes(shortMonths[i])) {
                      return `${months[i]} 2568`;
                    }
                  }
                  return 'ตุลาคม 2568';
                })();
                
                return (
                  <div 
                    key={index} 
                    data-period-month={monthName}
                    className={`mb-3 p-4 rounded-2xl transition-all duration-200 ${
                      trip.status === 'full' 
                        ? 'bg-gray-100 opacity-60 cursor-not-allowed pointer-events-none' 
                        : 'bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-md active:scale-[0.98] cursor-pointer'
                    }`}
                    style={trip.status === 'full' ? { pointerEvents: 'none' } : {}}
                  >
                  {/* Date and Status Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        trip.status === 'full' ? 'bg-gray-200' : 'bg-blue-100'
                      }`}>
                        <Calendar className={`w-5 h-5 ${
                          trip.status === 'full' ? 'text-gray-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${
                          trip.status === 'full' ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {trip.date}
                        </div>
                        <div className={`text-sm font-medium ${
                          trip.status === 'available' ? 'text-green-600' : 
                          trip.status === 'limited' ? 'text-orange-600' : 'text-red-500'
                        }`}>
                          {trip.status === 'full' ? 'เต็มแล้ว' : `เหลือ ${trip.available} ที่นั่ง`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className={`w-3 h-3 rounded-full ${
                      trip.status === 'available' ? 'bg-green-400' : 
                      trip.status === 'limited' ? 'bg-orange-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  {/* Price and Button Row */}
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      {trip.status === 'full' ? (
                        <div className="opacity-50">
                          {/* Disabled pricing for full status */}
                          {trip.originalPrice ? (
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-300 line-through">฿{trip.originalPrice.toLocaleString()}</span>
                                <span className="bg-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">
                                  -{Math.round(trip.discount)}%
                                </span>
                              </div>
                              <div className="text-2xl font-black text-gray-400">
                                ฿{trip.price.toLocaleString()}<span className="text-sm text-gray-400 font-normal ml-1">/ท่าน</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-2xl font-black text-gray-400">
                                ฿{trip.price.toLocaleString()}<span className="text-sm text-gray-400 font-normal ml-1">/ท่าน</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {trip.originalPrice ? (
                            <div className="text-right">
                              {/* Promotional pricing - Minimal Design */}
                              <div className="flex items-baseline justify-start gap-2 mb-1">
                                <span className="text-sm text-gray-400 line-through">฿{trip.originalPrice.toLocaleString()}</span>
                                <span className="text-xs text-red-600 font-medium">-{Math.round(trip.discount)}%</span>
                              </div>
                              <div className="text-2xl font-bold text-red-600">
                                ฿{trip.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal ml-1">/ท่าน</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-right">
                              {/* Regular pricing - Minimal Design */}
                              <div className="text-2xl font-bold text-gray-900">
                                ฿{trip.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal ml-1">/ท่าน</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {trip.status !== 'full' ? (
                      <button 
                        className={`px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                          trip.status === 'limited' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                        }`}
                        onClick={() => {
                          console.log(`จองรอบวันที่ ${trip.date}`);
                          setShowTravelModal(false);
                        }}
                      >
                        {trip.status === 'limited' ? 'จองด่วน!' : 'จองเลย'}
                      </button>
                    ) : (
                      <div className="px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-bold">
                        เต็มแล้ว
                      </div>
                    )}
                  </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ExactTourCard;

// CSS for Flash Sale Border Animation
const FlashSaleBorderStyles = () => (
  <style jsx global>{`
    .flash-sale-border {
      position: relative;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(90deg, #ff0066, #ff6600, #ffcc00, #ff6600, #ff0066) border-box;
      border: 3px solid transparent;
      border-radius: 12px;
      background-size: 100% 100%, 300% 100%;
      animation: moveBorder 6s linear infinite;
    }
    
    @keyframes moveBorder {
      0% {
        background-position: 0% 0%, 0% 0%;
      }
      100% {
        background-position: 0% 0%, 200% 0%;
      }
    }
    
    .regular-border {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }
    
    .regular-border:hover {
      border-color: #d1d5db;
    }
  `}</style>
);
