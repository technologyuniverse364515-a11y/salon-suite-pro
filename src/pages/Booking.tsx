import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, User, Clock, Calendar, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { services, staff } from "@/lib/sample-data";
import { ScreenText, ButtonLabels, Messages } from "@/lib/constants";
import { BOOKING_CONFIG } from "@/lib/booking-config";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedService,
  setSelectedStaff,
  setSelectedDate,
  setSelectedTime,
  setCustomerForm,
  setStep,
  addBooking,
  resetBooking,
} from "@/store/bookingSlice";
import {
  generateTimeSlots,
  formatDateStr,
  formatTimeDisplay,
  timeToMinutes,
  isSlotAvailable,
} from "@/lib/booking-utils";

export default function Booking() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const {
    bookings,
    selectedServiceId,
    selectedStaffId,
    selectedDate,
    selectedTime,
    customerForm,
    currentStep: step,
  } = useAppSelector((state) => state.booking);

  // Sync preselected service from URL on mount
  useEffect(() => {
    const serviceParam = params.get("service");
    if (serviceParam && services.some((s) => s.id === serviceParam) && !selectedServiceId) {
      dispatch(setSelectedService(serviceParam));
      dispatch(setStep(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const service = services.find((s) => s.id === selectedServiceId);
  const availableStaff = service ? staff.filter((s) => service.staffIds.includes(s.id)) : [];
  const staffMember = staff.find((s) => s.id === selectedStaffId);
  const steps = ScreenText.booking.steps;

  // 30-day bookable window (today → today + 29)
  const dateRange = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + BOOKING_CONFIG.bookingWindowDays - 1);
    return { today, endDate };
  }, []);

  // Time slots for current service
  const timeSlots = useMemo(() => {
    if (!service) return [];
    return generateTimeSlots(service.duration, service.breakTime);
  }, [service]);

  // Non-cancelled bookings for selected staff
  const staffBookings = useMemo(() => {
    if (!selectedStaffId) return [];
    return bookings.filter((b) => b.staffId === selectedStaffId && b.status !== "cancelled");
  }, [bookings, selectedStaffId]);

  // Fully booked dates (all slots taken)
  const fullyBookedDates = useMemo(() => {
    if (!selectedStaffId || !service || timeSlots.length === 0) return new Set<string>();
    const booked = new Set<string>();
    const current = new Date(dateRange.today);
    const end = new Date(dateRange.endDate);

    while (current <= end) {
      const dateStr = formatDateStr(current);
      const dayBookings = staffBookings.filter((b) => b.date === dateStr);
      if (dayBookings.length > 0) {
        const allTaken = timeSlots.every(
          (slot) => !isSlotAvailable(slot, service.duration, service.breakTime, dayBookings, services)
        );
        if (allTaken) booked.add(dateStr);
      }
      current.setDate(current.getDate() + 1);
    }
    return booked;
  }, [selectedStaffId, service, staffBookings, timeSlots, dateRange]);

  // Partially booked dates (some slots taken but not all)
  const partiallyBookedDates = useMemo(() => {
    if (!selectedStaffId) return new Set<string>();
    const partial = new Set<string>();
    const current = new Date(dateRange.today);
    const end = new Date(dateRange.endDate);

    while (current <= end) {
      const dateStr = formatDateStr(current);
      const dayBookings = staffBookings.filter((b) => b.date === dateStr);
      if (dayBookings.length > 0 && !fullyBookedDates.has(dateStr)) {
        partial.add(dateStr);
      }
      current.setDate(current.getDate() + 1);
    }
    return partial;
  }, [selectedStaffId, staffBookings, dateRange, fullyBookedDates]);

  // Available time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !service) return [];
    const dayBookings = staffBookings.filter((b) => b.date === selectedDate);
    const isToday = selectedDate === formatDateStr(dateRange.today);
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return timeSlots.map((slot) => ({
      time: slot,
      available:
        isSlotAvailable(slot, service.duration, service.breakTime, dayBookings, services) &&
        (!isToday || timeToMinutes(slot) > currentMinutes),
    }));
  }, [selectedDate, service, staffBookings, timeSlots, dateRange.today]);

  // Step validation
  const canNext = () => {
    if (step === 0) return !!selectedServiceId;
    if (step === 1) return !!selectedStaffId;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!customerForm.name && !!customerForm.email && !!customerForm.phone;
    return true;
  };

  // Handlers with cascading resets
  const handleServiceSelect = (serviceId: string) => {
    dispatch(setSelectedService(serviceId));
    dispatch(setSelectedStaff(""));
    dispatch(setSelectedDate(""));
    dispatch(setSelectedTime(""));
  };

  const handleStaffSelect = (staffId: string) => {
    dispatch(setSelectedStaff(staffId));
    dispatch(setSelectedDate(""));
    dispatch(setSelectedTime(""));
  };

  const handleBack = () => {
    if (step === 2) {
      dispatch(setSelectedDate(""));
      dispatch(setSelectedTime(""));
    }
    if (step === 1) {
      dispatch(setSelectedStaff(""));
      dispatch(setSelectedDate(""));
      dispatch(setSelectedTime(""));
    }
    dispatch(setStep(Math.max(0, step - 1)));
  };

  const handleConfirm = () => {
    dispatch(
      addBooking({
        id: `b-${Date.now()}`,
        customerName: customerForm.name,
        customerEmail: customerForm.email,
        customerPhone: customerForm.phone,
        serviceId: selectedServiceId,
        staffId: selectedStaffId,
        date: selectedDate,
        time: selectedTime,
        status: "confirmed",
        createdAt: formatDateStr(new Date()),
      })
    );
    toast.success(Messages.bookingSuccess);
    setTimeout(() => {
      dispatch(resetBooking());
      navigate("/");
    }, 2000);
  };

  // ── Calendar rendering ───────────────────────────────────────────────
  const renderMonthGrid = (year: number, month: number) => {
    const { today, endDate } = dateRange;
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div>
        <h4 className="text-sm font-semibold text-foreground text-center mb-3">{monthLabel}</h4>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
            <div
              key={w}
              className="text-center text-[10px] font-medium text-muted-foreground py-1 uppercase tracking-wider"
            >
              {w}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`pad-${month}-${i}`} />;

            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const dateStr = formatDateStr(date);
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;
            const isOutOfRange = date > endDate;
            const isFullyBooked = fullyBookedDates.has(dateStr);
            const isPartiallyBooked = partiallyBookedDates.has(dateStr);
            const isSelected = selectedDate === dateStr;
            const isDisabled = isPast || isOutOfRange || isFullyBooked;

            const dayButton = (
              <button
                disabled={isDisabled}
                onClick={() => {
                  dispatch(setSelectedDate(dateStr));
                  dispatch(setSelectedTime(""));
                }}
                className={cn(
                  "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200",
                  isSelected && "bg-primary text-primary-foreground font-semibold shadow-lg scale-105",
                  !isSelected && !isDisabled && "hover:bg-primary/10 text-foreground cursor-pointer",
                  (isPast || isOutOfRange) && !isFullyBooked && "text-muted-foreground/25 cursor-not-allowed",
                  isFullyBooked && !isPast && "text-destructive/60 cursor-not-allowed bg-destructive/5",
                  isToday && !isSelected && "ring-1 ring-primary/50 font-medium"
                )}
              >
                <span className="mb-[4px]">{day}</span>

                {isPartiallyBooked && !isSelected && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-amber-500" />
                )}
              </button>
            );

            // Wrap fully booked (non-past) dates with tooltip
            if (isFullyBooked && !isPast) {
              return (
                <Tooltip key={dateStr} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <span className="inline-flex w-full">{dayButton}</span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Fully booked for this stylist
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={dateStr}>{dayButton}</div>;
          })}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const { today } = dateRange;
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const nextMonth = (currentMonth + 1) % 12;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderMonthGrid(currentYear, currentMonth)}
        {renderMonthGrid(nextMonthYear, nextMonth)}
      </div>
    );
  };

  // ── Main render ──────────────────────────────────────────────────────
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground text-center">{ScreenText.booking.title}</h1>
        <p className="text-muted-foreground text-center mt-2">{ScreenText.booking.subtitle}</p>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mt-10 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors",
                  i < step
                    ? "bg-primary text-primary-foreground border-primary"
                    : i === step
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("w-8 h-px", i < step ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 0: Service Selection ── */}
        {step === 0 && (
          <div className="space-y-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => handleServiceSelect(s.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg border transition-colors text-left",
                  selectedServiceId === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                )}
              >
                <img src={s.image} alt={s.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{s.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{s.description}</div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Est. {s.duration} min
                    </span>
                    {s.breakTime > 0 && (
                      <span className="text-muted-foreground/70">+ {s.breakTime} min break</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-foreground font-semibold">${s.price}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 1: Staff Selection (filtered by service) ── */}
        {step === 1 && (
          <div>
            {availableStaff.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No stylists available for this service.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableStaff.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleStaffSelect(s.id)}
                    className={cn(
                      "p-4 rounded-lg border transition-colors text-left",
                      selectedStaffId === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-foreground">{s.name}</div>
                        <div className="text-sm text-muted-foreground">{s.role}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs text-muted-foreground">{s.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Date & Time ── */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Calendar */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Select Date
              </h3>
              {renderCalendar()}
              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/50 inline-block ring-1 ring-primary/40" />
                  Today
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Partially booked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive/60 inline-block" />
                  Fully booked
                </span>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Select Time
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {service?.name} — {service?.duration} min session
                  {service?.breakTime ? ` + ${service.breakTime} min break` : ""}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {availableTimeSlots.map(({ time, available }) => {
                    const btn = (
                      <button
                        disabled={!available}
                        onClick={() => dispatch(setSelectedTime(time))}
                        className={cn(
                          "py-2.5 px-3 rounded-lg border text-sm transition-all duration-200 w-full",
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground font-medium shadow-md"
                            : available
                              ? "border-border text-foreground hover:border-primary/30 hover:bg-primary/5"
                              : "border-border/50 text-muted-foreground/40 cursor-not-allowed bg-muted/30 line-through"
                        )}
                      >
                        {formatTimeDisplay(time)}
                      </button>
                    );

                    if (!available) {
                      return (
                        <Tooltip key={time} delayDuration={200}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex w-full">{btn}</span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            This time slot is already booked
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <div key={time}>{btn}</div>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Customer Details ── */}
        {step === 3 && (
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                value={customerForm.name}
                onChange={(e) => dispatch(setCustomerForm({ name: e.target.value }))}
                placeholder="Jane Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerForm.email}
                onChange={(e) => dispatch(setCustomerForm({ email: e.target.value }))}
                placeholder="jane@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={customerForm.phone}
                onChange={(e) => dispatch(setCustomerForm({ phone: e.target.value }))}
                placeholder="(555) 000-0000"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* ── Step 4: Confirmation ── */}
        {step === 4 && (
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="text-foreground">{service?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stylist</span>
                <span className="text-foreground">{staffMember?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground">{formatTimeDisplay(selectedTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground">
                  {service?.duration} min{service?.breakTime ? ` + ${service.breakTime} min break` : ""}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-foreground font-medium">Total</span>
                <span className="text-foreground font-semibold">${service?.price}</span>
              </div>
            </div>
            <div className="pt-2 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-foreground">{customerForm.name}</span>
              </div>
              <div className="text-muted-foreground text-xs">
                {customerForm.email} · {customerForm.phone}
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-10">
          <Button variant="outline" onClick={handleBack} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4 mr-1" /> {ButtonLabels.back}
          </Button>
          {step < 4 ? (
            <Button onClick={() => dispatch(setStep(step + 1))} disabled={!canNext()}>
              {ButtonLabels.next} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleConfirm}>{ButtonLabels.confirm}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
