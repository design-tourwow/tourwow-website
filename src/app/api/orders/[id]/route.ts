import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../../auth/middleware';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await authenticate(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const order = await prisma.tourOrder.findUnique({ where: { id: Number(id) } });
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  if (order.userId !== user.id && user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await authenticate(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const order = await prisma.tourOrder.findUnique({ where: { id: Number(id) } });
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  if (order.userId !== user.id && user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await req.json();
  const updated = await prisma.tourOrder.update({ where: { id: order.id }, data });
  return NextResponse.json({ order: updated });
} 