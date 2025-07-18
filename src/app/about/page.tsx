import { Metadata } from 'next'
import { LoadingProvider } from '@/components/LoadingProvider';
import { Users, Target, Heart, Award, Globe, Shield, Star, Briefcase, Smile } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา - TourWow',
  description: 'ทำความรู้จักกับ TourWow ผู้ให้บริการทัวร์คุณภาพระดับโลก ทีมงานมืออาชีพ ประสบการณ์กว่า 10 ปี',
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "ศิริพร แสงทอง",
      position: "ผู้ก่อตั้ง & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      experience: "15 ปี",
      description: "ผู้เชี่ยวชาญด้านการท่องเที่ยวระดับนานาชาติ"
    },
    {
      name: "มานะ สิทธิ์พร", 
      position: "ผู้อำนวยการฝ่ายปฏิบัติการ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      experience: "12 ปี",
      description: "ผู้เชี่ยวชาญด้านการวางแผนและจัดการทัวร์"
    },
    {
      name: "นิตยา ใจดี",
      position: "หัวหน้าฝ่ายลูกค้าสัมพันธ์", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      experience: "8 ปี",
      description: "ผู้เชี่ยวชาญด้านการบริการและดูแลลูกค้า"
    }
  ]

  return (
    <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-t from-black/30 to-transparent text-white">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="ทีมงาน TourWow กำลังวางแผนการเดินทาง"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">เกี่ยวกับ TourWow</h1>
            <p className="text-lg md:text-xl max-w-3xl drop-shadow-xl">
              เราไม่ใช่แค่บริษัททัวร์ แต่เราคือเพื่อนร่วมเดินทางที่จะสร้างสรรค์ประสบการณ์สุดพิเศษให้คุณ
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-blue-50/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="ผู้ก่อตั้ง TourWow"
                    fill
                    className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">เรื่องราวของเรา</h2>
                <p className="text-gray-600 mb-4 text-lg">
                  TourWow ก่อตั้งขึ้นจากความหลงใหลในการเดินทางและการแบ่งปันความสวยงามของโลกให้กับทุกคน เราเริ่มต้นจากการเป็นกลุ่มเพื่อนที่รักการผจญภัยและอยากสร้างความแตกต่างในวงการทัวร์
                </p>
                <p className="text-gray-600 mb-6">
                  ตลอด 10 ปีที่ผ่านมา เราได้เติบโตและสร้างเครือข่ายทีมงานมืออาชีพทั่วโลก แต่สิ่งหนึ่งที่ไม่เคยเปลี่ยนคือ "หัวใจ" ของการบริการ เรามุ่งมั่นที่จะมอบทริปที่ไม่ใช่แค่การเที่ยวชมสถานที่ แต่เป็นการสร้างความทรงจำที่น่าประทับใจและปลอดภัยที่สุดสำหรับคุณและคนที่คุณรัก
                </p>
                 <Link href="/tours" passHref>
                  <Button size="lg">
                    ดูโปรแกรมทัวร์ของเรา
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">สิ่งที่เรายึดมั่น</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              ค่านิยมหลัก 4 ประการที่เป็นรากฐานในการดำเนินงานและบริการของเรา
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">ประสบการณ์เลิศล้ำ</h3>
                <p className="text-gray-600">สร้างสรรค์ทริปที่เหนือความคาดหมายและน่าประทับใจ</p>
              </div>
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                 <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">ปลอดภัยคือที่สุด</h3>
                <p className="text-gray-600">ดูแลความปลอดภัยของคุณดั่งคนในครอบครัว</p>
              </div>
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                 <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">บริการจากใจจริง</h3>
                <p className="text-gray-600">พร้อมช่วยเหลือและให้คำปรึกษาด้วยความเป็นมิตร</p>
              </div>
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                 <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">ความรับผิดชอบต่อโลก</h3>
                <p className="text-gray-600">ส่งเสริมการท่องเที่ยวอย่างยั่งยืนเพื่อโลกของเรา</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-blue-50/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">พบกับทีมงานมืออาชีพของเรา</h2>
            {teamMembers.length === 0 ? (
              <div className="text-center text-gray-500 py-12">ขออภัย ขณะนี้ยังไม่มีข้อมูลทีมงาน</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <Image src={member.image} alt={member.name} width={120} height={120} className="rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-500 text-sm mb-4">{member.description}</p>
                     <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>ประสบการณ์ {member.experience}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">พร้อมสร้างความทรงจำครั้งใหม่แล้วหรือยัง?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">ให้ TourWow เป็นส่วนหนึ่งของการเดินทางที่น่าประทับใจของคุณ ติดต่อเราเพื่อรับคำปรึกษา หรือดูโปรแกรมทัวร์ทั้งหมดได้เลย</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/tours" passHref>
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        <Globe className="mr-2 h-5 w-5" /> ดูทัวร์ทั้งหมด
                    </Button>
                </Link>
                <Link href="/contact" passHref>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
                       <Smile className="mr-2 h-5 w-5" /> ติดต่อเรา
                    </Button>
                </Link>
            </div>
          </div>
        </section>
      </main>
  );
}