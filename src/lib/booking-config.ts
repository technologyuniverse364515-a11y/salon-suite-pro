/**
 * Salon booking configuration
 * Centralized config for shop operating hours and booking window
 */
export const BOOKING_CONFIG = {
  /** Shop opening hour in 24h format (9 = 9:00 AM) */
  shopOpenHour: 9,
  /** Shop closing hour in 24h format (23 = 11:00 PM) */
  shopCloseHour: 23,
  /** Number of bookable days from today */
  bookingWindowDays: 30,
} as const;
