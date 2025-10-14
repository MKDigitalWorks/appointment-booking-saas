import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { handleError, NotFoundError } from '@/lib/errors';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const organization = await db.organization.findUnique({
      where: { slug: params.slug },
      include: {
        _count: {
          select: {
            services: true,
            staff: true,
            bookings: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundError('Organization');
    }

    return NextResponse.json(organization);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}
