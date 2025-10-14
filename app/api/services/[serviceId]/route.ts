import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { handleError, AppError, NotFoundError } from '@/lib/errors';

const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  duration: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
  depositPct: z.number().min(0).max(100).optional(),
  bufferBefore: z.number().min(0).optional(),
  bufferAfter: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const service = await db.service.findFirst({
      where: {
        id: params.serviceId,
        organization: {
          memberships: {
            some: {
              userId: session.user.id,
            },
          },
        },
      },
      include: {
        staffServices: {
          include: {
            staff: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundError('Service');
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    // Check if user has permission to update this service
    const service = await db.service.findFirst({
      where: {
        id: params.serviceId,
        organization: {
          memberships: {
            some: {
              userId: session.user.id,
              role: { in: ['OWNER', 'ADMIN'] },
            },
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundError('Service');
    }

    const body = await request.json();
    const data = updateServiceSchema.parse(body);

    const updatedService = await db.service.update({
      where: { id: params.serviceId },
      data,
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    // Check if user has permission to delete this service
    const service = await db.service.findFirst({
      where: {
        id: params.serviceId,
        organization: {
          memberships: {
            some: {
              userId: session.user.id,
              role: { in: ['OWNER', 'ADMIN'] },
            },
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundError('Service');
    }

    await db.service.delete({
      where: { id: params.serviceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}
