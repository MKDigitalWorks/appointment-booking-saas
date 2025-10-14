// app/api/ics/[bookingId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildICS } from "@/lib/ics";

export async function GET(
  _req: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.bookingId },
      include: {
        organization: true,
        service: true,
        staff: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
    }

    const ics = buildICS({
      uid: booking.id,
      dtStartISO: booking.start,
      dtEndISO: booking.end,
      timezone: booking.organization.timezone || "Europe/Berlin",
      summary: booking.service.name,
      description: [
        `Customer: ${booking.customerName} <${booking.customerEmail}>`,
        booking.notes ? `Notes: ${booking.notes}` : null,
        `Organization: ${booking.organization.name}`,
        booking.staff ? `Staff: ${booking.staff.name}` : null,
      ]
        .filter(Boolean)
        .join("\\n"),
      location: booking.organization.address || booking.organization.name || "",
    });

    return new NextResponse(ics, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="booking.ics"`,
      },
    });
  } catch (err: any) {
    console.error("[/api/ics/:bookingId] Error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
