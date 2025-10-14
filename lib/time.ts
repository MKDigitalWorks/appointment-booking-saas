import { DateTime } from 'luxon';

export function getTimezoneOffset(timezone: string): number {
  const now = DateTime.now().setZone(timezone);
  return now.offset;
}

export function convertToTimezone(date: Date, timezone: string): DateTime {
  return DateTime.fromJSDate(date).setZone(timezone);
}

export function convertFromTimezone(dateTime: DateTime, timezone: string): Date {
  return dateTime.setZone(timezone).toJSDate();
}

export function formatInTimezone(date: Date, timezone: string, format: string = 'yyyy-MM-dd HH:mm'): string {
  return DateTime.fromJSDate(date).setZone(timezone).toFormat(format);
}

export function getStartOfDay(date: Date, timezone: string): Date {
  return DateTime.fromJSDate(date).setZone(timezone).startOf('day').toJSDate();
}

export function getEndOfDay(date: Date, timezone: string): Date {
  return DateTime.fromJSDate(date).setZone(timezone).endOf('day').toJSDate();
}

export function addDays(date: Date, days: number, timezone: string): Date {
  return DateTime.fromJSDate(date).setZone(timezone).plus({ days }).toJSDate();
}

export function addMinutes(date: Date, minutes: number, timezone: string): Date {
  return DateTime.fromJSDate(date).setZone(timezone).plus({ minutes }).toJSDate();
}

export function isSameDay(date1: Date, date2: Date, timezone: string): boolean {
  const d1 = DateTime.fromJSDate(date1).setZone(timezone);
  const d2 = DateTime.fromJSDate(date2).setZone(timezone);
  return d1.hasSame(d2, 'day');
}

export function getDayOfWeek(date: Date, timezone: string): number {
  return DateTime.fromJSDate(date).setZone(timezone).weekday;
}

export function isBusinessDay(date: Date, timezone: string): boolean {
  const dayOfWeek = getDayOfWeek(date, timezone);
  return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
}

export function getBusinessDaysBetween(start: Date, end: Date, timezone: string): number {
  let count = 0;
  let current = new Date(start);
  
  while (current <= end) {
    if (isBusinessDay(current, timezone)) {
      count++;
    }
    current = addDays(current, 1, timezone);
  }
  
  return count;
}

export function getTimeSlots(
  start: Date,
  end: Date,
  intervalMinutes: number = 30,
  timezone: string
): Date[] {
  const slots: Date[] = [];
  let current = new Date(start);
  
  while (current < end) {
    slots.push(new Date(current));
    current = addMinutes(current, intervalMinutes, timezone);
  }
  
  return slots;
}

export function isTimeInRange(time: Date, start: Date, end: Date): boolean {
  return time >= start && time < end;
}

export function getDurationInMinutes(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

export function roundToNearestMinutes(date: Date, minutes: number): Date {
  const ms = minutes * 60 * 1000;
  return new Date(Math.round(date.getTime() / ms) * ms);
}
