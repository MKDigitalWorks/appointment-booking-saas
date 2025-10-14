// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Öffentlicher GET: Services per orgId ausliefern
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get('orgId');

  if (!orgId) {
    return NextResponse.json({ error: 'orgId required' }, { status: 400 });
  }

  const services = await prisma.service.findMany({
    where: { orgId },
    orderBy: { name: 'asc' }
  });

  return NextResponse.json(services);
}

// Deine bisherigen mutierenden Methoden (POST/PATCH/DELETE) bleiben unverändert & geschützt.
