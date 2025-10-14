// app/api/staff/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Öffentlicher GET: Staff per orgId ausliefern
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get('orgId');

  if (!orgId) {
    return NextResponse.json({ error: 'orgId required' }, { status: 400 });
  }

  const staff = await prisma.staff.findMany({
    where: { orgId },
    orderBy: { name: 'asc' }
  });

  return NextResponse.json(staff);
}
