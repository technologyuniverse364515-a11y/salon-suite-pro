import { BOOKING_CONFIG } from './booking-config';

/** Convert "HH:MM" string to total minutes */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Convert total minutes to "HH:MM" string */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/** Format Date to "YYYY-MM-DD" using local timezone */
export function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const mo = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

/** Convert 24h "HH:MM" to 12h display "H:MM AM/PM" */
export function formatTimeDisplay(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/** Generate all possible time slots for a service based on duration + break */
export function generateTimeSlots(duration: number, breakTime: number): string[] {
  const slots: string[] = [];
  const interval = duration + breakTime;
  const open = BOOKING_CONFIG.shopOpenHour * 60;
  const close = BOOKING_CONFIG.shopCloseHour * 60;

  let current = open;
  while (current + duration <= close) {
    slots.push(minutesToTime(current));
    current += interval;
  }
  return slots;
}

/** Get a Date object offset by N days from today (midnight) */
export function getDateOffset(offset: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

/**
 * Check if a time slot is available given existing bookings.
 * Accounts for overlapping service durations + break times.
 */
export function isSlotAvailable(
  slotTime: string,
  serviceDuration: number,
  serviceBreak: number,
  existingBookings: { time: string; serviceId: string }[],
  allServices: { id: string; duration: number; breakTime: number }[],
): boolean {
  const newStart = timeToMinutes(slotTime);
  const newEnd = newStart + serviceDuration + serviceBreak;

  for (const booking of existingBookings) {
    const bookedService = allServices.find((s) => s.id === booking.serviceId);
    if (!bookedService) continue;

    const existingStart = timeToMinutes(booking.time);
    const existingEnd = existingStart + bookedService.duration + bookedService.breakTime;

    if (newStart < existingEnd && newEnd > existingStart) {
      return false;
    }
  }

  return true;
}
