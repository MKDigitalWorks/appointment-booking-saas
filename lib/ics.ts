// lib/ics.ts
import { DateTime } from "luxon";

type BuildICSArgs = {
  uid: string;
  dtStartISO: string;
  dtEndISO: string;
  timezone: string; // e.g. "Europe/Berlin"
  summary: string;
  description?: string;
  location?: string;
};

export function buildICS({
  uid,
  dtStartISO,
  dtEndISO,
  timezone,
  summary,
  description,
  location,
}: BuildICSArgs) {
  // Convert to UTC but include TZID on DTSTART/DTEND to keep clients happy
  const dtStart = DateTime.fromISO(dtStartISO).setZone(timezone);
  const dtEnd = DateTime.fromISO(dtEndISO).setZone(timezone);

  const fmtLocal = (dt: DateTime) => dt.toFormat("yyyyMMdd'T'HHmmss");
  const nowUTC = DateTime.utc().toFormat("yyyyMMdd'T'HHmmss'Z'");

  const esc = (s?: string) =>
    (s || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const lines = [
    "BEGIN:VCALENDAR",
    "PRODID:-//MK Digital Works//Booking//EN",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${nowUTC}`,
    `DTSTART;TZID=${timezone}:${fmtLocal(dtStart)}`,
    `DTEND;TZID=${timezone}:${fmtLocal(dtEnd)}`,
    `SUMMARY:${esc(summary)}`,
    description ? `DESCRIPTION:${esc(description)}` : null,
    location ? `LOCATION:${esc(location)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}
