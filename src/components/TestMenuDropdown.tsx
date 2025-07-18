"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const continents = [
  {
    key: "asia",
    name: "เอเชีย",
    countries: [
      { code: "jp", name: "ญี่ปุ่น", desc: "ซากุระ ภูเขาไฟฟูจิ", tours: 24 },
      { code: "kr", name: "เกาหลีใต้", desc: "โซล สวนสนุก", tours: 18 },
      { code: "cn", name: "จีน", desc: "ปักกิ่ง เซี่ยงไฮ้", tours: 12 },
      { code: "th", name: "ไทย", desc: "กรุงเทพฯ เชียงใหม่", tours: 8 },
      { code: "sg", name: "สิงคโปร์", desc: "มารีนาเบย์", tours: 7 },
      { code: "vn", name: "เวียดนาม", desc: "ฮานอย โฮจิมินห์", tours: 9 },
      { code: "my", name: "มาเลเซีย", desc: "กัวลาลัมเปอร์", tours: 6 },
      { code: "in", name: "อินเดีย", desc: "ทัชมาฮาล", tours: 5 },
    ],
  },
  {
    key: "europe",
    name: "ยุโรป",
    countries: [
      { code: "fr", name: "ฝรั่งเศส", desc: "ปารีส หอไอเฟล", tours: 15 },
      { code: "it", name: "อิตาลี", desc: "โรม เวนิส", tours: 13 },
      { code: "gb", name: "อังกฤษ", desc: "ลอนดอน", tours: 10 },
      { code: "de", name: "เยอรมนี", desc: "เบอร์ลิน มิวนิค", tours: 8 },
      { code: "es", name: "สเปน", desc: "บาร์เซโลนา มาดริด", tours: 7 },
      { code: "ch", name: "สวิตเซอร์แลนด์", desc: "ซูริค ลูเซิร์น", tours: 6 },
      { code: "at", name: "ออสเตรีย", desc: "เวียนนา ซาลซ์บูร์ก", tours: 5 },
      { code: "nl", name: "เนเธอร์แลนด์", desc: "อัมสเตอร์ดัม", tours: 4 },
    ],
  },
  {
    key: "america",
    name: "อเมริกา",
    countries: [
      { code: "us", name: "สหรัฐอเมริกา", desc: "นิวยอร์ก ลาสเวกัส", tours: 11 },
      { code: "ca", name: "แคนาดา", desc: "โตรอนโต แวนคูเวอร์", tours: 6 },
      { code: "mx", name: "เม็กซิโก", desc: "แคนคูน", tours: 3 },
      { code: "br", name: "บราซิล", desc: "ริโอเดจาเนโร", tours: 2 },
      { code: "ar", name: "อาร์เจนตินา", desc: "บัวโนสไอเรส", tours: 2 },
    ],
  },
  {
    key: "oceania",
    name: "โอเชียเนีย",
    countries: [
      { code: "au", name: "ออสเตรเลีย", desc: "ซิดนีย์ เมลเบิร์น", tours: 7 },
      { code: "nz", name: "นิวซีแลนด์", desc: "โอ๊คแลนด์ ควีนส์ทาวน์", tours: 4 },
      { code: "fj", name: "ฟิจิ", desc: "ซูวา", tours: 1 },
    ],
  },
  {
    key: "africa",
    name: "แอฟริกา",
    countries: [
      { code: "za", name: "แอฟริกาใต้", desc: "เคปทาวน์", tours: 3 },
      { code: "eg", name: "อียิปต์", desc: "ไคโร กีซา", tours: 2 },
      { code: "ma", name: "โมร็อกโก", desc: "มาราเกช", tours: 1 },
    ],
  },
];

const menuTypes = [
  { key: "simple", label: "Simple Dropdown" },
  { key: "mega", label: "Mega Menu Grid" },
  { key: "search", label: "Search-First" },
  { key: "tabbed", label: "Tabbed Interface" },
];

// รายชื่อประเทศทั้งหมด (ISO 3166-1 alpha-2)
const allCountryList = [
  { code: "af", name: "Afghanistan", thai: "อัฟกานิสถาน" },
  { code: "al", name: "Albania", thai: "แอลเบเนีย" },
  { code: "dz", name: "Algeria", thai: "แอลจีเรีย" },
  { code: "ad", name: "Andorra", thai: "อันดอร์รา" },
  { code: "ao", name: "Angola", thai: "แองโกลา" },
  { code: "ag", name: "Antigua and Barbuda", thai: "แอนติกาและบาร์บูดา" },
  { code: "ar", name: "Argentina", thai: "อาร์เจนตินา" },
  { code: "am", name: "Armenia", thai: "อาร์เมเนีย" },
  { code: "au", name: "Australia", thai: "ออสเตรเลีย" },
  { code: "at", name: "Austria", thai: "ออสเตรีย" },
  { code: "az", name: "Azerbaijan", thai: "อาเซอร์ไบจาน" },
  { code: "bs", name: "Bahamas", thai: "บาฮามส" },
  { code: "bh", name: "Bahrain", thai: "บาฮริน" },
  { code: "bd", name: "Bangladesh", thai: "บังกลีส" },
  { code: "bb", name: "Barbados", thai: "บารโบดส" },
  { code: "by", name: "Belarus", thai: "เบลารุส" },
  { code: "be", name: "Belgium", thai: "เบลเยก" },
  { code: "bz", name: "Belize", thai: "เบลิส" },
  { code: "bj", name: "Benin", thai: "เบนิน" },
  { code: "bt", name: "Bhutan", thai: "ภูฏน" },
  { code: "bo", name: "Bolivia", thai: "โบลิเวีย" },
  { code: "ba", name: "Bosnia and Herzegovina", thai: "บอสเนียและเฮร์เซโกวีนา" },
  { code: "bw", name: "Botswana", thai: "บอตสวะนา" },
  { code: "br", name: "Brazil", thai: "บราซิล" },
  { code: "bn", name: "Brunei", thai: "บรูเนีย" },
  { code: "bg", name: "Bulgaria", thai: "บุลลารีย์" },
  { code: "bf", name: "Burkina Faso", thai: "บูริกินาฟาซโอ" },
  { code: "bi", name: "Burundi", thai: "บูรินดี" },
  { code: "kh", name: "Cambodia", thai: "คมโบดีย์" },
  { code: "cm", name: "Cameroon", thai: "คะเมรูน" },
  { code: "ca", name: "Canada", thai: "แคนาดา" },
  { code: "cv", name: "Cape Verde", thai: "ซาปีเวร์ด์" },
  { code: "cf", name: "Central African Republic", thai: "สหรัฐประเทศแอฟริกากลาง" },
  { code: "td", name: "Chad", thai: "ชะด" },
  { code: "cl", name: "Chile", thai: "ชิลี" },
  { code: "cn", name: "China", thai: "จีน" },
  { code: "co", name: "Colombia", thai: "โคลัมเบีย" },
  { code: "km", name: "Comoros", thai: "คอโมรอส" },
  { code: "cg", name: "Congo", thai: "คองโก" },
  { code: "cd", name: "Congo (DRC)", thai: "คองโก (ดริคเคนซัล)" },
  { code: "cr", name: "Costa Rica", thai: "คอสตาริกา" },
  { code: "ci", name: "Côte d'Ivoire", thai: "โคต์ไอโวรี" },
  { code: "hr", name: "Croatia", thai: "โครเอเชีย" },
  { code: "cu", name: "Cuba", thai: "คิวบา" },
  { code: "cy", name: "Cyprus", thai: "เซิรุส" },
  { code: "cz", name: "Czechia", thai: "เชกีย" },
  { code: "dk", name: "Denmark", thai: "เดนมาร์ก" },
  { code: "dj", name: "Djibouti", thai: "จิบูตี" },
  { code: "dm", name: "Dominica", thai: "โดมินิกา" },
  { code: "do", name: "Dominican Republic", thai: "รัฐประชาธิปไตยดอมินิกัน" },
  { code: "ec", name: "Ecuador", thai: "เคควเดอรค" },
  { code: "eg", name: "Egypt", thai: "อียิปต์" },
  { code: "sv", name: "El Salvador", thai: "เลซะวะดอร" },
  { code: "gq", name: "Equatorial Guinea", thai: "เคควะเตอริอลิปิน" },
  { code: "er", name: "Eritrea", thai: "เริตรีย์" },
  { code: "ee", name: "Estonia", thai: "เอสโตเนีย" },
  { code: "sz", name: "Eswatini", thai: "เซวะซวะนิ" },
  { code: "et", name: "Ethiopia", thai: "เอธิโอเปีย" },
  { code: "fj", name: "Fiji", thai: "ฟิจิ" },
  { code: "fi", name: "Finland", thai: "ฟินลันด์" },
  { code: "fr", name: "France", thai: "ฝรั่งเศส" },
  { code: "ga", name: "Gabon", thai: "กาบอน" },
  { code: "gm", name: "Gambia", thai: "แกมเบีย" },
  { code: "ge", name: "Georgia", thai: "จอร์เจีย" },
  { code: "de", name: "Germany", thai: "เยอรมนี" },
  { code: "gh", name: "Ghana", thai: "กาฮะนา" },
  { code: "gr", name: "Greece", thai: "กรีซ" },
  { code: "gd", name: "Grenada", thai: "เกรเนดะ" },
  { code: "gt", name: "Guatemala", thai: "กูเตมะละ" },
  { code: "gn", name: "Guinea", thai: "กินี" },
  { code: "gw", name: "Guinea-Bissau", thai: "กินีบิซะว" },
  { code: "gy", name: "Guyana", thai: "ไกยะนา" },
  { code: "ht", name: "Haiti", thai: "ไฮตี" },
  { code: "hn", name: "Honduras", thai: "ออนดูระส" },
  { code: "hu", name: "Hungary", thai: "อุงรี" },
  { code: "is", name: "Iceland", thai: "ไอซ์แลนด์" },
  { code: "in", name: "India", thai: "อินเดีย" },
  { code: "id", name: "Indonesia", thai: "อินโดนีเซีย" },
  { code: "ir", name: "Iran", thai: "อิระน" },
  { code: "iq", name: "Iraq", thai: "อิระก" },
  { code: "ie", name: "Ireland", thai: "ไอร์แลนด์" },
  { code: "il", name: "Israel", thai: "อิสรออล" },
  { code: "it", name: "Italy", thai: "อิตาลี" },
  { code: "jm", name: "Jamaica", thai: "จาเมกา" },
  { code: "jp", name: "Japan", thai: "ญี่ปุ่น" },
  { code: "jo", name: "Jordan", thai: "จอร์แดน" },
  { code: "kz", name: "Kazakhstan", thai: "คาซะคสถาน" },
  { code: "ke", name: "Kenya", thai: "เคนยา" },
  { code: "ki", name: "Kiribati", thai: "คิริบะตี" },
  { code: "kp", name: "North Korea", thai: "เกียร์เนียกอร์" },
  { code: "kr", name: "South Korea", thai: "เกียร์เนียกอร์ใต้" },
  { code: "kw", name: "Kuwait", thai: "คูเวต" },
  { code: "kg", name: "Kyrgyzstan", thai: "คีร์กิสถาน" },
  { code: "la", name: "Laos", thai: "ละโอส" },
  { code: "lv", name: "Latvia", thai: "ละตเวีย" },
  { code: "lb", name: "Lebanon", thai: "เลเบนอน" },
  { code: "ls", name: "Lesotho", thai: "เลโซโท" },
  { code: "lr", name: "Liberia", thai: "ไลเบรีย" },
  { code: "ly", name: "Libya", thai: "ลิเบีย" },
  { code: "li", name: "Liechtenstein", thai: "ลิชเตนสไตน์" },
  { code: "lt", name: "Lithuania", thai: "ลิเทนีย" },
  { code: "lu", name: "Luxembourg", thai: "ลักเซมเบิรก" },
  { code: "mg", name: "Madagascar", thai: "มะดะการี" },
  { code: "mw", name: "Malawi", thai: "มะละวี" },
  { code: "my", name: "Malaysia", thai: "มะเลเซีย" },
  { code: "mv", name: "Maldives", thai: "มะลิวดีฟ" },
  { code: "ml", name: "Mali", thai: "มะลี" },
  { code: "mt", name: "Malta", thai: "มะละตะ" },
  { code: "mh", name: "Marshall Islands", thai: "ไอลิลส์เลินส์" },
  { code: "mr", name: "Mauritania", thai: "มอริเตนีย" },
  { code: "mu", name: "Mauritius", thai: "มอริไชย์" },
  { code: "mx", name: "Mexico", thai: "เม็กซิโก" },
  { code: "fm", name: "Micronesia", thai: "ไมโครเซีย" },
  { code: "md", name: "Moldova", thai: "มอลดอวา" },
  { code: "mc", name: "Monaco", thai: "โมนาโก" },
  { code: "mn", name: "Mongolia", thai: "มองโลีย์" },
  { code: "me", name: "Montenegro", thai: "โมนเตเนโกร์" },
  { code: "ma", name: "Morocco", thai: "มอรโก" },
  { code: "mz", name: "Mozambique", thai: "โมซะเบีย" },
  { code: "mm", name: "Myanmar", thai: "เมนมาร์" },
  { code: "na", name: "Namibia", thai: "นามิเบีย" },
  { code: "nr", name: "Nauru", thai: "นารู" },
  { code: "np", name: "Nepal", thai: "เนปะล" },
  { code: "nl", name: "Netherlands", thai: "เนเธอร์แลนด์" },
  { code: "nz", name: "New Zealand", thai: "นิวซีแลนด์" },
  { code: "ni", name: "Nicaragua", thai: "นิการะกะ" },
  { code: "ne", name: "Niger", thai: "นิเจีย" },
  { code: "ng", name: "Nigeria", thai: "ไนจีเรีย" },
  { code: "mk", name: "North Macedonia", thai: "มอคะดอเนียเหนือ" },
  { code: "no", name: "Norway", thai: "โนร์วะ" },
  { code: "om", name: "Oman", thai: "ออมัน" },
  { code: "pk", name: "Pakistan", thai: "ปากีสถาน" },
  { code: "pw", name: "Palau", thai: "ปาลาว" },
  { code: "ps", name: "Palestine", thai: "ปาเลสติน" },
  { code: "pa", name: "Panama", thai: "ปานามา" },
  { code: "pg", name: "Papua New Guinea", thai: "ปาปูอนิวกินี" },
  { code: "py", name: "Paraguay", thai: "ปาระกวะย" },
  { code: "pe", name: "Peru", thai: "เปรู" },
  { code: "ph", name: "Philippines", thai: "ฟิลิปปินส์" },
  { code: "pl", name: "Poland", thai: "โปแลนด์" },
  { code: "pt", name: "Portugal", thai: "โปรตุเกส" },
  { code: "qa", name: "Qatar", thai: "กาตาร์" },
  { code: "ro", name: "Romania", thai: "โรมะเนีย" },
  { code: "ru", name: "Russia", thai: "รัสเซีย" },
  { code: "rw", name: "Rwanda", thai: "รวะนด์" },
  { code: "kn", name: "Saint Kitts and Nevis", thai: "เซนต์คิตสและเนฝิส" },
  { code: "lc", name: "Saint Lucia", thai: "เซนต์ลูเชีย" },
  { code: "vc", name: "Saint Vincent and the Grenadines", thai: "เซนต์วินเซนตและเกรเนดะ" },
  { code: "ws", name: "Samoa", thai: "ซามะอวะ" },
  { code: "sm", name: "San Marino", thai: "ซานมาริโน" },
  { code: "st", name: "Sao Tome and Principe", thai: "เซอตอมและพรินซิป" },
  { code: "sa", name: "Saudi Arabia", thai: "ซูเดียรายอบระอะ" },
  { code: "sn", name: "Senegal", thai: "เซเนกะล" },
  { code: "rs", name: "Serbia", thai: "เซอรเบีย" },
  { code: "sc", name: "Seychelles", thai: "เซเชลส์" },
  { code: "sl", name: "Sierra Leone", thai: "ซีเรลิโลน" },
  { code: "sg", name: "Singapore", thai: "สิงกโปร์" },
  { code: "sk", name: "Slovakia", thai: "สลอกะเกีย" },
  { code: "si", name: "Slovenia", thai: "สลโวเนีย" },
  { code: "sb", name: "Solomon Islands", thai: "โซโลมอน์ไอลิส" },
  { code: "so", name: "Somalia", thai: "โซมะลี" },
  { code: "za", name: "South Africa", thai: "โซะฟริกา" },
  { code: "ss", name: "South Sudan", thai: "โซะดูนดะฟริกาใต้" },
  { code: "es", name: "Spain", thai: "สเปน" },
  { code: "lk", name: "Sri Lanka", thai: "ศรีลังกา" },
  { code: "sd", name: "Sudan", thai: "ซูดะน" },
  { code: "sr", name: "Suriname", thai: "ซูรินะม" },
  { code: "se", name: "Sweden", thai: "สวิดเดน" },
  { code: "ch", name: "Switzerland", thai: "สวิตเซอร์แลนด์" },
  { code: "sy", name: "Syria", thai: "ซีระย์" },
  { code: "tw", name: "Taiwan", thai: "ไตเวน" },
  { code: "tj", name: "Tajikistan", thai: "ทาจิกสถาน" },
  { code: "tz", name: "Tanzania", thai: "ทะนซะนีย" },
  { code: "th", name: "Thailand", thai: "ไทย" },
  { code: "tl", name: "Timor-Leste", thai: "ติมอร์เลส์" },
  { code: "tg", name: "Togo", thai: "โตโก" },
  { code: "to", name: "Tonga", thai: "ตองะ" },
  { code: "tt", name: "Trinidad and Tobago", thai: "ตรินิดอดและโตโบโก" },
  { code: "tn", name: "Tunisia", thai: "ตูนิเซีย" },
  { code: "tr", name: "Turkey", thai: "ตุรกี" },
  { code: "tm", name: "Turkmenistan", thai: "ตุรเกียสถาน" },
  { code: "tv", name: "Tuvalu", thai: "ตูวะลู" },
  { code: "ug", name: "Uganda", thai: "อุกะนดา" },
  { code: "ua", name: "Ukraine", thai: "ยุเครน" },
  { code: "ae", name: "United Arab Emirates", thai: "สหรัฐอาหรีย์อิมิเรต" },
  { code: "gb", name: "United Kingdom", thai: "สหรัฐอิงคิปอินเดีย" },
  { code: "us", name: "United States", thai: "สหรัฐอเมริกา" },
  { code: "uy", name: "Uruguay", thai: "อูรุกวะย" },
  { code: "uz", name: "Uzbekistan", thai: "อุซเบกสถาน" },
  { code: "vu", name: "Vanuatu", thai: "วะนูะตู" },
  { code: "va", name: "Vatican City", thai: "เวติกันซิตี" },
  { code: "ve", name: "Venezuela", thai: "เวเนซุเอละ" },
  { code: "vn", name: "Vietnam", thai: "เวเตนะม" },
  { code: "ye", name: "Yemen", thai: "เยเมน" },
  { code: "zm", name: "Zambia", thai: "ซะมบิะอ" },
  { code: "zw", name: "Zimbabwe", thai: "ซิมบะเบิระ" },
];

export default function TestMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState("simple");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("asia");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // รวมประเทศทั้งหมด
  const allCountries = continents.flatMap((c) => c.countries);
  // ฟิลเตอร์ประเทศตาม search
  const filteredCountries = search
    ? allCountries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase())
      )
    : allCountries;

  // ฟิลเตอร์ประเทศในแต่ละทวีปตาม search
  const filteredContinents = continents.map((cont) => ({
    ...cont,
    countries: search
      ? cont.countries.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
        )
      : cont.countries,
  }));

  // ป้องกัน dropdown หลุดเมื่อ mouse เคลื่อนที่เร็ว
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        type="button"
      >
        Test Menu
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[950px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {/* Selector */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            {menuTypes.map((type) => (
              <button
                key={type.key}
                className={`flex-1 px-4 py-3 text-base font-medium transition-colors ${
                  activeType === type.key
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveType(type.key)}
                type="button"
              >
                {type.label}
              </button>
            ))}
          </div>
          {/* Demo Area - Full Version */}
          <div className="p-8 min-w-[900px]">
            {activeType === "simple" && (
              <div>
                <div className="mb-4 text-lg font-bold text-blue-700">Simple Dropdown</div>
                <ul className="grid grid-cols-2 gap-2">
                  {filteredCountries.slice(0, 12).map((c) => (
                    <li key={c.code}>
                      <Link href={`/tours?search=${encodeURIComponent(c.name)}`} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50">
                        <span className={`fi fi-${c.code} text-xl`}></span>
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-gray-500">{c.desc}</span>
                        <span className="ml-auto text-xs text-blue-600 font-semibold">{c.tours} ทัวร์</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeType === "mega" && (
              <div>
                <div className="mb-4 text-lg font-bold text-blue-700">Mega Menu Grid</div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {filteredCountries.map((c) => (
                    <Link key={c.code} href={`/tours?search=${encodeURIComponent(c.name)}`} className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50">
                      <span className={`fi fi-${c.code} text-3xl mb-2`}></span>
                      <span className="font-semibold text-base mb-1">{c.name}</span>
                      <span className="text-xs text-gray-500 text-center">{c.desc}</span>
                      {c.tours && <span className="mt-1 text-xs text-blue-600 font-semibold">{c.tours} ทัวร์</span>}
                    </Link>
                  ))}
                </div>
                <div className="mb-2 text-base font-bold text-blue-700">All Countries</div>
                <input
                  type="text"
                  placeholder="ค้นหาประเทศทั้งหมด..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 text-sm"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="grid grid-cols-8 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {allCountryList.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                    <div key={c.code} className="flex flex-col items-center p-2">
                      <span className={`fi fi-${c.code} text-xl mb-1`}></span>
                      <span className="text-xs text-gray-700 text-center truncate w-16 font-bold">{c.thai}</span>
                      <span className="text-[10px] text-gray-400 text-center truncate w-16">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeType === "search" && (
              <div>
                <div className="mb-4 text-lg font-bold text-blue-700">Search-First (All Countries)</div>
                {/* Popular Countries Section */}
                <div className="mb-6">
                  <div className="mb-2 text-base font-bold text-amber-700 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-1"></span>
                    ประเทศยอดฮิต
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { code: "jp", thai: "ญี่ปุ่น" },
                      { code: "cn", thai: "จีน" },
                      { code: "vn", thai: "เวียดนาม" },
                      { code: "kr", thai: "เกาหลีใต้" },
                      { code: "sg", thai: "สิงคโปร์" },
                    ].map(({ code, thai }) => {
                      const c = allCountryList.find(c => c.code === code);
                      if (!c) return null;
                      return (
                        <div key={c.code} className="flex flex-col items-center p-2 rounded-xl border-2 border-amber-400 shadow-md hover:scale-110 transition-transform bg-white relative group cursor-pointer">
                          <span className={`fi fi-${c.code} text-3xl mb-2 drop-shadow`}></span>
                          <span className="text-base font-bold text-amber-900 mb-0.5 underline decoration-amber-400 decoration-2 underline-offset-4 flex items-center gap-1">
                            <svg className="w-4 h-4 text-amber-400 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78L10 2z"/></svg>
                            {thai}
                          </span>
                          <span className="text-xs text-gray-500">{c.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="ค้นหาประเทศหรือจุดหมาย..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 text-base"
                />
                <div className="grid grid-cols-8 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {allCountryList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.thai.includes(search)).map((c) => (
                    <div key={c.code} className="flex flex-col items-center p-2">
                      <span className={`fi fi-${c.code} text-xl mb-1`}></span>
                      <span className="text-xs text-gray-700 text-center truncate w-16 font-bold">{c.thai}</span>
                      <span className="text-[10px] text-gray-400 text-center truncate w-16">{c.name}</span>
                    </div>
                  ))}
                  {allCountryList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.thai.includes(search)).length === 0 && (
                    <div className="col-span-8 text-center text-gray-400 py-4">ไม่พบประเทศที่ค้นหา</div>
                  )}
                </div>
              </div>
            )}
            {activeType === "tabbed" && (
              <div>
                <div className="mb-4 text-lg font-bold text-blue-700">Tabbed Interface</div>
                <div className="flex space-x-2 mb-4">
                  {continents.map((cont) => (
                    <button
                      key={cont.key}
                      className={`px-3 py-1 rounded text-sm font-medium ${activeTab === cont.key ? "bg-blue-50 text-blue-700" : "text-gray-500"}`}
                      onClick={() => setActiveTab(cont.key)}
                    >
                      {cont.name}
                    </button>
                  ))}
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {filteredContinents.find((c) => c.key === activeTab)?.countries.map((c) => (
                    <li key={c.code}>
                      <Link href={`/tours?search=${encodeURIComponent(c.name)}`} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50">
                        <span className={`fi fi-${c.code} text-xl`}></span>
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-gray-500">{c.desc}</span>
                        <span className="ml-auto text-xs text-blue-600 font-semibold">{c.tours} ทัวร์</span>
                      </Link>
                    </li>
                  ))}
                  {filteredContinents.find((c) => c.key === activeTab)?.countries.length === 0 && (
                    <li className="col-span-2 text-center text-gray-400 py-4">ไม่พบประเทศในทวีปนี้</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 