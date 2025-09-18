import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../auth/middleware';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const user = await authenticate(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const orders = await prisma.tourOrder.findMany({ where: { userId: user.id } });
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const user = await authenticate(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  // รับข้อมูล order minimal (ตัวอย่าง: tourName, totalAmount, ...)
  const order = await prisma.tourOrder.create({
    data: {
      ...data,
      userId: user.id,
    },
  });
  return NextResponse.json({ order });
} 