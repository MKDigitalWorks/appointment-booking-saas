import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { handleError, AppError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';

const createOrgSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  timezone: z.string().default('UTC'),
  currency: z.string().default('EUR'),
  taxEnabled: z.boolean().default(false),
  taxRate: z.number().min(0).max(100).default(0),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const organizations = await db.organization.findMany({
      where: {
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
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    // Rate limiting
    const rateLimitResult = await checkRateLimit(session.user.id);
    if (!rateLimitResult.success) {
      throw new AppError('Rate limit exceeded', 429);
    }

    const body = await request.json();
    const data = createOrgSchema.parse(body);

    // Check if slug is already taken
    const existingOrg = await db.organization.findUnique({
      where: { slug: data.slug },
    });

    if (existingOrg) {
      throw new AppError('Organization slug already exists', 409);
    }

    const organization = await db.$transaction(async (tx) => {
      // Create organization
      const org = await tx.organization.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          email: data.email,
          phone: data.phone,
          address: data.address,
          timezone: data.timezone,
          currency: data.currency,
          taxEnabled: data.taxEnabled,
          taxRate: data.taxRate,
        },
      });

      // Create membership for the creator
      await tx.membership.create({
        data: {
          userId: session.user.id,
          orgId: org.id,
          role: 'OWNER',
        },
      });

      // Create trial license
      await tx.license.create({
        data: {
          orgId: org.id,
          status: 'TRIAL',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });

      return org;
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}
