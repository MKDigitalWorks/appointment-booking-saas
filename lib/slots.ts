import { db } from './db';
import { DateTime } from 'luxon';
import { getTimeSlots, addMinutes, isTimeInRange, getDayOfWeek } from './time';

export interface Slot {
  start: Date;
  end: Date;
  available: boolean;
  staffId?: string;
  staffName?: string;
}

export interface SlotParams {
  orgId: string;
  serviceId: string;
  staffId?: string;
  date: Date;
  timezone: string;
  intervalMinutes?: number;
}

export async function getAvailableSlots(params: SlotParams): Promise<Slot[]> {
  const {
    orgId,
    serviceId,
    staffId,
    date,
    timezone,
    intervalMinutes = 30,
  } = params;

  // Get service details
  const service = await db.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error('Service not found');
  }

  // Get staff members who can provide this service
  const staffMembers = await db.staff.findMany({
    where: {
      orgId,
      isActive: true,
      ...(staffId ? { id: staffId } : {}),
      staffServices: {
        some: {
          serviceId,
        },
      },
    },
    include: {
      staffServices: {
        where: {
          serviceId,
        },
      },
    },
  });

  if (staffMembers.length === 0) {
    return [];
  }

  // Get organization's timezone and working hours
  const org = await db.organization.findUnique({
    where: { id: orgId },
  });

  const orgTimezone = org?.timezone || timezone;

  // Get opening hours for the organization
  const orgOpeningHours = await db.openingHours.findMany({
    where: {
      orgId,
      staffId: null,
    },
  });

  // Get staff-specific opening hours
  const staffOpeningHours = await db.openingHours.findMany({
    where: {
      orgId,
      staffId: { in: staffMembers.map(s => s.id) },
    },
  });

  // Get holidays
  const holidays = await db.holiday.findMany({
    where: {
      orgId,
      startDate: { lte: date },
      endDate: { gte: date },
    },
  });

  // Get staff exceptions
  const staffExceptions = await db.staffException.findMany({
    where: {
      staffId: { in: staffMembers.map(s => s.id) },
      startDate: { lte: date },
      endDate: { gte: date },
    },
  });

  // Get existing bookings
  const startOfDay = DateTime.fromJSDate(date).setZone(orgTimezone).startOf('day').toJSDate();
  const endOfDay = DateTime.fromJSDate(date).setZone(orgTimezone).endOf('day').toJSDate();

  const existingBookings = await db.booking.findMany({
    where: {
      orgId,
      startTime: { gte: startOfDay },
      endTime: { lte: endOfDay },
      status: { in: ['PENDING', 'CONFIRMED'] },
    },
  });

  // Generate time slots for the day
  const dayStart = DateTime.fromJSDate(date).setZone(orgTimezone).startOf('day').toJSDate();
  const dayEnd = DateTime.fromJSDate(date).setZone(orgTimezone).endOf('day').toJSDate();
  
  const allSlots = getTimeSlots(dayStart, dayEnd, intervalMinutes, orgTimezone);
  
  const availableSlots: Slot[] = [];

  for (const slotStart of allSlots) {
    const slotEnd = addMinutes(slotStart, service.duration, orgTimezone);
    
    // Check if slot is within business hours
    const dayOfWeek = getDayOfWeek(slotStart, orgTimezone);
    const isHoliday = holidays.some(h => 
      slotStart >= h.startDate && slotStart <= h.endDate
    );

    if (isHoliday) {
      continue;
    }

    // Check organization hours
    const orgHours = orgOpeningHours.find(h => h.dayOfWeek === dayOfWeek);
    if (!orgHours || !orgHours.isOpen) {
      continue;
    }

    const slotStartTime = DateTime.fromJSDate(slotStart).setZone(orgTimezone).toFormat('HH:mm');
    const slotEndTime = DateTime.fromJSDate(slotEnd).setZone(orgTimezone).toFormat('HH:mm');

    if (slotStartTime < orgHours.startTime || slotEndTime > orgHours.endTime) {
      continue;
    }

    // Check each staff member
    for (const staff of staffMembers) {
      // Check staff-specific hours
      const staffHours = staffOpeningHours.find(h => 
        h.staffId === staff.id && h.dayOfWeek === dayOfWeek
      );

      if (staffHours && (!staffHours.isOpen || 
          slotStartTime < staffHours.startTime || 
          slotEndTime > staffHours.endTime)) {
        continue;
      }

      // Check staff exceptions
      const hasException = staffExceptions.some(e => 
        e.staffId === staff.id && 
        slotStart >= e.startDate && 
        slotStart <= e.endDate && 
        !e.isAvailable
      );

      if (hasException) {
        continue;
      }

      // Check for conflicts with existing bookings
      const hasConflict = existingBookings.some(booking => {
        if (booking.staffId && booking.staffId !== staff.id) {
          return false;
        }

        return isTimeInRange(slotStart, booking.startTime, booking.endTime) ||
               isTimeInRange(slotEnd, booking.startTime, booking.endTime) ||
               (slotStart <= booking.startTime && slotEnd >= booking.endTime);
      });

      if (!hasConflict) {
        availableSlots.push({
          start: slotStart,
          end: slotEnd,
          available: true,
          staffId: staff.id,
          staffName: staff.name,
        });
      }
    }
  }

  // Sort slots by time
  return availableSlots.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export async function isSlotAvailable(
  orgId: string,
  serviceId: string,
  staffId: string | null,
  startTime: Date,
  endTime: Date
): Promise<boolean> {
  // Check for existing bookings in the same time slot
  const conflictingBookings = await db.booking.findMany({
    where: {
      orgId,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
      status: { in: ['PENDING', 'CONFIRMED'] },
      ...(staffId ? { staffId } : {}),
    },
  });

  return conflictingBookings.length === 0;
}

export async function reserveSlot(
  orgId: string,
  serviceId: string,
  staffId: string | null,
  startTime: Date,
  endTime: Date
): Promise<boolean> {
  // Use a transaction to prevent race conditions
  return await db.$transaction(async (tx) => {
    // Double-check availability
    const isAvailable = await isSlotAvailable(orgId, serviceId, staffId, startTime, endTime);
    
    if (!isAvailable) {
      return false;
    }

    // Slot is available, return true
    // The actual booking creation will happen in the booking API
    return true;
  });
}
