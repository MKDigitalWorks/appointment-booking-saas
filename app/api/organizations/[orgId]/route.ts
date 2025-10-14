import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { handleError, AppError, NotFoundError } from '@/lib/errors';

const updateOrgSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  taxEnabled: z.boolean().optional(),
  taxRate: z.number().min(0).max(100).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const organization = await db.organization.findFirst({
      where: {
        id: params.orgId,
        memberships: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        memberships: {
          where: {
            userId: session.user.id,
          },
        },
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    // Check if user has permission to update this organization
    const membership = await db.membership.findFirst({
      where: {
        userId: session.user.id,
        orgId: params.orgId,
        role: { in: ['OWNER', 'ADMIN'] },
      },
    });

    if (!membership) {
      throw new AppError('Forbidden', 403);
    }

    const body = await request.json();
    const data = updateOrgSchema.parse(body);

    const organization = await db.organization.update({
      where: { id: params.orgId },
      data,
    });

    return NextResponse.json(organization);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    // Check if user is owner
    const membership = await db.membership.findFirst({
      where: {
        userId: session.user.id,
        orgId: params.orgId,
        role: 'OWNER',
      },
    });

    if (!membership) {
      throw new AppError('Forbidden', 403);
    }

    await db.organization.delete({
      where: { id: params.orgId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}
