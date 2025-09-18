'use client'

import styles from './style.module.css';
import Image from 'next/image';
import { useState } from 'react';

const tours = [
  {
    id: 'tw6163',
    name: 'Japan Sakura Festival',
    price: 29900,
    image: '/template/1/tours/japan.jpg',
    promo: 'ลด 20%',
    rating: 4.8,
    reviews: 120,
    duration: '5 วัน 4 คืน',
  },
  {
    id: 'tw8888',
    name: 'Korea Autumn Leaves',
    price: 25900,
    image: '/template/1/tours/korea.jpg',
    promo: 'Flash Sale',
    rating: 4.7,
    reviews: 98,
    duration: '4 วัน 3 คืน',
  },
  {
    id: 'tw9999',
    name: 'Switzerland Dream',
    price: 79900,
    image: '/template/1/tours/swiss.jpg',
    promo: 'Early Bird',
    rating: 4.9,
    reviews: 45,
    duration: '7 วัน 6 คืน',
  },
];

export default function ToursSearch() {
  const [search, setSearch] = useState('');
  const filtered = tours.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className={styles.bg}>
      <div className={styles.centered}>
        <h1 className={styles.title}>ค้นหาทัวร์ต่างประเทศ</h1>
        <input
          className={styles.search}
          placeholder="ค้นหาทัวร์ เช่น ญี่ปุ่น เกาหลี..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.bubbleRow}>
          {filtered.length === 0 && <div className={styles.noResult}>ไม่พบทัวร์ที่ต้องการ</div>}
          {filtered.map(tour => (
            <a key={tour.id} href={`/template/1/tours/${tour.id}`} className={styles.bubble}>
              <div className={styles.imgWrap}>
                <Image src={tour.image} alt={tour.name} fill className={styles.img} />
                <span className={styles.promo}>{tour.promo}</span>
              </div>
              <div className={styles.info}>
                <div className={styles.tourName}>{tour.name}</div>
                <div className={styles.duration}>⏰ {tour.duration}</div>
                <div className={styles.price}>฿{tour.price.toLocaleString()}</div>
                <div className={styles.rating}>{tour.rating}★ ({tour.reviews})</div>
                <button className={styles.cta}>ดูรายละเอียด</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
} 