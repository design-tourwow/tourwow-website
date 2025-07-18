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
        ]
      }),
      prisma.productPool.count()
    ])

    console.log('API: product-pool - ส่งข้อมูลทั้งหมด')
    console.log('Rows returned:', tours.length, 'Total:', total)

    return NextResponse.json({
      data: tours,
      total
    })
  } catch (error) {
    console.error('Error fetching product pool tours:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}