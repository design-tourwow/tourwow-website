import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // ดึงข้อมูลทั้งหมดไม่มี limit
    const [tours, total] = await Promise.all([
      prisma.productPool.findMany({
        orderBy: [
          { productIsRecommended: 'desc' },
          { productStartAt: 'asc' }
        ],
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
      prisma.productPool.count()
    ])

    console.log('API: product-pool - ส่งข้อมูลทั้งหมด')
    console.log('Rows returned:', tours.length, 'Total:', total)

    return NextResponse.json({
      data: tours.map(t => ({ ...t, period_id: t.periodId })),
      total
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