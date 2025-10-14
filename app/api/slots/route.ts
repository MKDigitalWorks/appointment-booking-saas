import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/slots';
import { z } from 'zod';
import { handleError, AppError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';

const slotsSchema = z.object({
  orgId: z.string().min(1),
  serviceId: z.string().min(1),
  staffId: z.string().optional(),
  date: z.string().transform((str) => new Date(str)),
  timezone: z.string().default('UTC'),
  intervalMinutes: z.number().min(5).max(60).default(30),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      orgId: searchParams.get('orgId'),
      serviceId: searchParams.get('serviceId'),
      staffId: searchParams.get('staffId'),
      date: searchParams.get('date'),
      timezone: searchParams.get('timezone') || 'UTC',
      intervalMinutes: parseInt(searchParams.get('intervalMinutes') || '30'),
    };

    // Rate limiting for public endpoint
    const rateLimitResult = await checkRateLimit(request.ip || 'anonymous', true);
    if (!rateLimitResult.success) {
      throw new AppError('Rate limit exceeded', 429);
    }

    const validatedParams = slotsSchema.parse(params);
    const slots = await getAvailableSlots(validatedParams);

    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error).message },
      { status: handleError(error).statusCode }
    );
  }
}
