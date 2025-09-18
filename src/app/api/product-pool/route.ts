import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // รับ parameters สำหรับ pagination และ filter
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit
    
    // รับ filter parameters
    const search = searchParams.get('search') || ''
    const country = searchParams.get('country') || ''
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999')
    const days = searchParams.get('days') || ''
    const nights = searchParams.get('nights') || ''
    const hotelStar = searchParams.get('hotelStar') || ''
    const airline = searchParams.get('airline') || ''
    const sortBy = searchParams.get('sortBy') || 'productStartAt'

    // สร้าง where clause สำหรับ filter
    const where: any = {}
    
    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { productTourCode: { contains: search, mode: 'insensitive' } },
        { productTourwowCode: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (country && country !== 'ทั้งหมด') {
      where.productMainCountryNameTh = country
    }
    
    if (minPrice > 0 || maxPrice < 999999) {
      where.productPrice = {
        gte: minPrice,
        lte: maxPrice
      }
    }
    
    if (days && days !== 'ทั้งหมด') {
      where.productDurationDay = parseInt(days)
    }
    
    if (nights && nights !== 'ทั้งหมด') {
      where.productDurationNight = parseInt(nights)
    }
    
    if (hotelStar && hotelStar !== 'ทั้งหมด') {
      const starValue = parseInt(hotelStar.replace(' ดาว', ''))
      where.productHotelStar = { gte: starValue, lt: starValue + 1 }
    }
    
    // กำหนด orderBy ตาม sortBy
    let orderBy: any = []
    switch (sortBy) {
      case 'ราคาต่ำสุด':
        orderBy = [{ productPrice: 'asc' }]
        break
      case 'ราคาสูงสุด':
        orderBy = [{ productPrice: 'desc' }]
        break
      case 'วันที่ใหม่':
        orderBy = [{ productStartAt: 'desc' }]
        break
      case 'วันเดินทางใกล้สุด':
        orderBy = [{ periodStartAt: 'asc' }]
        break
      case 'แนะนำ':
        orderBy = [{ productIsRecommended: 'desc' }, { productStartAt: 'asc' }]
        break
      default:
        orderBy = [{ productIsRecommended: 'desc' }, { productStartAt: 'asc' }]
    }

    // ก่อนอื่นหา unique tour codes
    const uniqueTourCodes = await prisma.productPool.findMany({
      where,
      select: {
        productTourwowCode: true,
      },
      distinct: ['productTourwowCode'],
      orderBy,
      skip: skip,
      take: limit,
    })

    // จากนั้นดึงข้อมูลทั้งหมดของ tours เหล่านั้น (รวม periods ทั้งหมด)
    const tourCodes = uniqueTourCodes.map(t => t.productTourwowCode)
    
    const [tours, totalUniqueTours] = await Promise.all([
      prisma.productPool.findMany({
        where: {
          ...where,
          productTourwowCode: {
            in: tourCodes
          }
        },
        orderBy,
        select: {
          // ...fields you want to return...
          id: true,
          productName: true,
          productTourCode: true,
          productTourwowCode: true,
          productPrice: true,
          productPriceCompare: true,
          productMainCountryNameTh: true,
          productMainCountryNameEn: true,
          productCountries: true,
          productDurationDay: true,
          productDurationNight: true,
          productDurationDayAndNight: true,
          productHotelStar: true,
          productMealAmount: true,
          productHilightDescription: true,
          productBannerUrl: true,
          productIsRecommended: true,
          productStartAt: true,
          productTags: true,
          periodStartAt: true,
          periodEndAt: true,
          periodPriceAdultDouble: true,
          periodPriceAdultDoubleCompare: true,
          periodQuantityRemaining: true,
          periodIsActive: true,
          periodGoTransportationNameEn: true,
          periodGoTransportationCode: true,
          periodBackTransportationNameEn: true,
          periodBackTransportationCode: true,
          periodId: true,
        }
      }),
      prisma.productPool.findMany({
        where,
        select: { productTourwowCode: true },
        distinct: ['productTourwowCode']
      }).then(result => result.length)
    ])

    console.log(`API: product-pool - Page ${page}, Limit ${limit}`)
    console.log('Unique tours requested:', tourCodes.length)
    console.log('Total rows returned:', tours.length)
    console.log('Total unique tours available:', totalUniqueTours)

    return NextResponse.json({
      data: tours.map(t => ({ ...t, period_id: t.periodId })),
      total: totalUniqueTours,
      page,
      limit,
      totalPages: Math.ceil(totalUniqueTours / limit)
    })
  } catch (error) {
    console.error('Error fetching product pool tours:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours', detail: error instanceof Error ? error.stack : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect()
  }
}