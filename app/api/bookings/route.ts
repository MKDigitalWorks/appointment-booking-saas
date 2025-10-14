// app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        status: true,
        start: true,
        end: true,
        currency: true,
        totalCents: true,
        payMode: true,
        customerName: true,
        customerEmail: true,
        organization: { select: { id: true, name: true, slug: true, timezone: true } },
        service: { select: { id: true, name: true, duration: true } }, // << HIER
        staff: { select: { id: true, name: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, booking });
  } catch (err: any) {
    console.error("[/api/bookings/:id] Error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
