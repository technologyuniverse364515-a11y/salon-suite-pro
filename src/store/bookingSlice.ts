import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Booking } from '@/lib/sample-data';
import { generateTimeSlots, formatDateStr, getDateOffset } from '@/lib/booking-utils';

const CUSTOMER_NAMES = [
  'Emily Rodriguez', 'Jessica Moore', 'David Kim', 'Sarah Lee',
  'Anna Williams', 'Lauren Brooks', 'Christine Hall', 'Michael Scott',
  'Rachel Taylor', 'Karen Park', 'Tom Baker', 'Lisa Morgan',
];

/**
 * Generates pre-booked appointments relative to today's date.
 * Includes fully-booked days for specific artists to demonstrate the feature.
 */
function generatePreBookedAppointments(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookings: Booking[] = [];
  let id = 1;

  // Day +2: Sophia Laurent (st1) FULLY BOOKED — Signature Haircut (60 min + 10 min break)
  const fullDay1 = formatDateStr(getDateOffset(2));
  const hairSlots = generateTimeSlots(60, 10);
  hairSlots.forEach((time, i) => {
    bookings.push({
      id: `pre-${id++}`,
      customerName: CUSTOMER_NAMES[i % CUSTOMER_NAMES.length],
      customerEmail: `${CUSTOMER_NAMES[i % CUSTOMER_NAMES.length].toLowerCase().replace(/\s/g, '.')}@email.com`,
      customerPhone: `555-${String(1000 + i).padStart(4, '0')}`,
      serviceId: 's1',
      staffId: 'st1',
      date: fullDay1,
      time,
      status: 'confirmed',
      createdAt: formatDateStr(today),
    });
  });

  // Day +5: Aria Patel (st3) FULLY BOOKED — Luxury Facial (75 min + 10 min break)
  const fullDay2 = formatDateStr(getDateOffset(5));
  const facialSlots = generateTimeSlots(75, 10);
  facialSlots.forEach((time, i) => {
    bookings.push({
      id: `pre-${id++}`,
      customerName: `Client ${String.fromCharCode(65 + i)}`,
      customerEmail: `client.${String.fromCharCode(97 + i)}@email.com`,
      customerPhone: `555-${String(2000 + i).padStart(4, '0')}`,
      serviceId: 's4',
      staffId: 'st3',
      date: fullDay2,
      time,
      status: 'confirmed',
      createdAt: formatDateStr(today),
    });
  });

  // Day +1: Partial bookings for various staff
  const day1 = formatDateStr(getDateOffset(1));
  bookings.push(
    { id: `pre-${id++}`, customerName: 'John Davis', customerEmail: 'john.davis@email.com', customerPhone: '555-3001', serviceId: 's1', staffId: 'st4', date: day1, time: '09:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Mary Johnson', customerEmail: 'mary.johnson@email.com', customerPhone: '555-3002', serviceId: 's2', staffId: 'st1', date: day1, time: '10:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Robert Chen', customerEmail: 'robert.chen@email.com', customerPhone: '555-3003', serviceId: 's1', staffId: 'st2', date: day1, time: '14:00', status: 'pending', createdAt: formatDateStr(today) },
  );

  // Day +3: Partial bookings for Marcus Chen (st2)
  const day3 = formatDateStr(getDateOffset(3));
  bookings.push(
    { id: `pre-${id++}`, customerName: 'Alice Wong', customerEmail: 'alice.wong@email.com', customerPhone: '555-4001', serviceId: 's1', staffId: 'st2', date: day3, time: '09:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Brian Lee', customerEmail: 'brian.lee@email.com', customerPhone: '555-4002', serviceId: 's1', staffId: 'st2', date: day3, time: '10:10', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Carol Smith', customerEmail: 'carol.smith@email.com', customerPhone: '555-4003', serviceId: 's3', staffId: 'st2', date: day3, time: '14:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Diana Ross', customerEmail: 'diana.ross@email.com', customerPhone: '555-4004', serviceId: 's1', staffId: 'st2', date: day3, time: '19:30', status: 'confirmed', createdAt: formatDateStr(today) },
  );

  // Day +7: Scattered bookings
  const day7 = formatDateStr(getDateOffset(7));
  bookings.push(
    { id: `pre-${id++}`, customerName: 'Eva Green', customerEmail: 'eva.green@email.com', customerPhone: '555-5001', serviceId: 's3', staffId: 'st1', date: day7, time: '09:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Frank Miller', customerEmail: 'frank.miller@email.com', customerPhone: '555-5002', serviceId: 's5', staffId: 'st3', date: day7, time: '14:00', status: 'confirmed', createdAt: formatDateStr(today) },
  );

  // Day +10: A few bookings
  const day10 = formatDateStr(getDateOffset(10));
  bookings.push(
    { id: `pre-${id++}`, customerName: 'Grace Kim', customerEmail: 'grace.kim@email.com', customerPhone: '555-6001', serviceId: 's6', staffId: 'st1', date: day10, time: '09:00', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Henry Adams', customerEmail: 'henry.adams@email.com', customerPhone: '555-6002', serviceId: 's4', staffId: 'st3', date: day10, time: '13:15', status: 'pending', createdAt: formatDateStr(today) },
  );

  // Day +15: More scattered
  const day15 = formatDateStr(getDateOffset(15));
  bookings.push(
    { id: `pre-${id++}`, customerName: 'Ivy Chen', customerEmail: 'ivy.chen@email.com', customerPhone: '555-7001', serviceId: 's1', staffId: 'st1', date: day15, time: '11:20', status: 'confirmed', createdAt: formatDateStr(today) },
    { id: `pre-${id++}`, customerName: 'Jake Wilson', customerEmail: 'jake.wilson@email.com', customerPhone: '555-7002', serviceId: 's2', staffId: 'st2', date: day15, time: '09:00', status: 'confirmed', createdAt: formatDateStr(today) },
  );

  return bookings;
}

interface BookingState {
  bookings: Booking[];
  selectedServiceId: string;
  selectedStaffId: string;
  selectedDate: string;
  selectedTime: string;
  customerForm: {
    name: string;
    email: string;
    phone: string;
  };
  currentStep: number;
}

const initialState: BookingState = {
  bookings: generatePreBookedAppointments(),
  selectedServiceId: '',
  selectedStaffId: '',
  selectedDate: '',
  selectedTime: '',
  customerForm: { name: '', email: '', phone: '' },
  currentStep: 0,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedService(state, action: PayloadAction<string>) {
      state.selectedServiceId = action.payload;
    },
    setSelectedStaff(state, action: PayloadAction<string>) {
      state.selectedStaffId = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setSelectedTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    setCustomerForm(state, action: PayloadAction<Partial<BookingState['customerForm']>>) {
      state.customerForm = { ...state.customerForm, ...action.payload };
    },
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    addBooking(state, action: PayloadAction<Booking>) {
      state.bookings.push(action.payload);
    },
    resetBooking(state) {
      state.selectedServiceId = '';
      state.selectedStaffId = '';
      state.selectedDate = '';
      state.selectedTime = '';
      state.customerForm = { name: '', email: '', phone: '' };
      state.currentStep = 0;
    },
  },
});

export const {
  setSelectedService,
  setSelectedStaff,
  setSelectedDate,
  setSelectedTime,
  setCustomerForm,
  setStep,
  addBooking,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
