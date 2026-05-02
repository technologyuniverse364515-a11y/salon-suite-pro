export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  duration: number; // minutes (estimated service time)
  breakTime: number; // minutes (break between appointments)
  image: string;
  benefits: string[];
  staffIds: string[]; // staff who can perform this service
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  rating: number;
}

export interface Review {
  id: string;
  serviceId: string;
  customerName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
}

export const services: Service[] = [
  {
    id: "s1",
    name: "Signature Haircut",
    category: "Hair",
    description: "Precision cutting tailored to your face shape and style",
    longDescription: "Our signature haircut begins with a thorough consultation to understand your lifestyle, preferences, and hair goals. Our master stylists use precision techniques combined with the latest trends to create a look that's uniquely you. Includes shampoo, conditioning treatment, and styled finish.",
    price: 85,
    duration: 60,
    breakTime: 10,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    benefits: ["Personalized consultation", "Premium products", "Styled finish included", "Complimentary touch-up within 2 weeks"],
    staffIds: ["st1", "st2", "st4"],
  },
  {
    id: "s2",
    name: "Balayage Color",
    category: "Color",
    description: "Hand-painted highlights for a natural, sun-kissed look",
    longDescription: "Balayage is a French coloring technique where color is hand-painted onto the hair to create a graduated, natural-looking effect. Perfect for those wanting low-maintenance color with maximum impact. Our colorists are trained in the latest balayage methods.",
    price: 220,
    duration: 180,
    breakTime: 15,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    benefits: ["Low maintenance", "Natural-looking results", "Customized color blend", "Toner included"],
    staffIds: ["st1", "st2"],
  },
  {
    id: "s3",
    name: "Keratin Treatment",
    category: "Treatment",
    description: "Smoothing treatment for frizz-free, silky hair",
    longDescription: "Our professional keratin treatment infuses your hair with keratin protein, eliminating frizz and adding incredible shine. Results last 3-5 months. Safe for color-treated hair.",
    price: 300,
    duration: 150,
    breakTime: 20,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800",
    benefits: ["Frizz elimination", "Lasts 3-5 months", "Safe for colored hair", "Reduces styling time by 50%"],
    staffIds: ["st1", "st2"],
  },
  {
    id: "s4",
    name: "Luxury Facial",
    category: "Skin",
    description: "Deep-cleansing facial with premium organic products",
    longDescription: "Indulge in our luxury facial experience featuring organic, cruelty-free products. Includes deep cleansing, exfoliation, extraction, custom mask, and facial massage. Your skin will glow.",
    price: 150,
    duration: 75,
    breakTime: 10,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    benefits: ["Organic products", "Customized to skin type", "Deep hydration", "Visible results in one session"],
    staffIds: ["st3"],
  },
  {
    id: "s5",
    name: "Gel Manicure",
    category: "Nails",
    description: "Long-lasting gel polish with nail care treatment",
    longDescription: "Our gel manicure includes cuticle care, nail shaping, hand massage, and application of premium gel polish that lasts up to 3 weeks without chipping.",
    price: 55,
    duration: 45,
    breakTime: 5,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    benefits: ["Chip-free for 3 weeks", "Nail strengthening base", "Wide color selection", "Hand massage included"],
    staffIds: ["st3"],
  },
  {
    id: "s6",
    name: "Bridal Package",
    category: "Special",
    description: "Complete bridal beauty package for your special day",
    longDescription: "Make your big day unforgettable with our comprehensive bridal package. Includes trial session, day-of hair styling, makeup application, and touch-up kit. Our bridal specialists ensure you look flawless from ceremony to reception.",
    price: 500,
    duration: 240,
    breakTime: 30,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
    benefits: ["Trial session included", "Long-lasting makeup", "Touch-up kit provided", "On-location available"],
    staffIds: ["st1", "st3"],
  },
];

export const staff: StaffMember[] = [
  { id: "st1", name: "Sophia Laurent", role: "Master Stylist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", specialties: ["Balayage", "Precision Cuts"], rating: 4.9 },
  { id: "st2", name: "Marcus Chen", role: "Senior Colorist", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", specialties: ["Color Correction", "Highlights"], rating: 4.8 },
  { id: "st3", name: "Aria Patel", role: "Skin Specialist", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", specialties: ["Facials", "Skin Treatments"], rating: 5.0 },
  { id: "st4", name: "James Rivera", role: "Stylist", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", specialties: ["Men's Cuts", "Beard Grooming"], rating: 4.7 },
];

export const reviews: Review[] = [
  { id: "r1", serviceId: "s1", customerName: "Emily R.", rating: 5, reviewText: "Best haircut I've ever had! Sophia really understood what I wanted.", createdAt: "2025-12-15" },
  { id: "r2", serviceId: "s2", customerName: "Jessica M.", rating: 5, reviewText: "My balayage looks absolutely stunning. So many compliments!", createdAt: "2025-12-20" },
  { id: "r3", serviceId: "s1", customerName: "David K.", rating: 4, reviewText: "Great atmosphere and skilled stylists. Will definitely be back.", createdAt: "2026-01-05" },
  { id: "r4", serviceId: "s4", customerName: "Sarah L.", rating: 5, reviewText: "The luxury facial was truly transformative. My skin has never looked better.", createdAt: "2026-01-10" },
  { id: "r5", serviceId: "s3", customerName: "Michelle T.", rating: 5, reviewText: "The keratin treatment changed my life. No more frizz!", createdAt: "2026-02-01" },
  { id: "r6", serviceId: "s5", customerName: "Anna W.", rating: 4, reviewText: "Beautiful gel manicure that lasted over 2 weeks.", createdAt: "2026-02-15" },
  { id: "r7", serviceId: "s6", customerName: "Lauren B.", rating: 5, reviewText: "Made my wedding day perfect. The bridal package was worth every penny.", createdAt: "2026-03-01" },
  { id: "r8", serviceId: "s2", customerName: "Christina H.", rating: 5, reviewText: "Marcus is a color genius. Exactly what I envisioned!", createdAt: "2026-03-10" },
];

// Legacy sample bookings kept for reference — active bookings are now managed via Redux
export const sampleBookings: Booking[] = [
  { id: "b1", customerName: "Emily Rodriguez", customerEmail: "emily@email.com", customerPhone: "555-0101", serviceId: "s1", staffId: "st1", date: "2026-04-12", time: "10:00", status: "confirmed", createdAt: "2026-04-08" },
  { id: "b2", customerName: "Jessica Moore", customerEmail: "jessica@email.com", customerPhone: "555-0102", serviceId: "s2", staffId: "st2", date: "2026-04-12", time: "14:00", status: "pending", createdAt: "2026-04-09" },
  { id: "b3", customerName: "David Kim", customerEmail: "david@email.com", customerPhone: "555-0103", serviceId: "s1", staffId: "st4", date: "2026-04-13", time: "11:00", status: "confirmed", createdAt: "2026-04-09" },
  { id: "b4", customerName: "Sarah Lee", customerEmail: "sarah@email.com", customerPhone: "555-0104", serviceId: "s4", staffId: "st3", date: "2026-04-14", time: "09:00", status: "completed", createdAt: "2026-04-07" },
  { id: "b5", customerName: "Michelle Turner", customerEmail: "michelle@email.com", customerPhone: "555-0105", serviceId: "s3", staffId: "st1", date: "2026-04-10", time: "13:00", status: "completed", createdAt: "2026-04-05" },
];

export const sampleCustomers: Customer[] = [
  { id: "c1", name: "Emily Rodriguez", email: "emily@email.com", phone: "555-0101", totalVisits: 12, totalSpent: 1450, lastVisit: "2026-04-08" },
  { id: "c2", name: "Jessica Moore", email: "jessica@email.com", phone: "555-0102", totalVisits: 8, totalSpent: 1820, lastVisit: "2026-04-02" },
  { id: "c3", name: "David Kim", email: "david@email.com", phone: "555-0103", totalVisits: 5, totalSpent: 425, lastVisit: "2026-03-28" },
  { id: "c4", name: "Sarah Lee", email: "sarah@email.com", phone: "555-0104", totalVisits: 15, totalSpent: 2250, lastVisit: "2026-04-07" },
  { id: "c5", name: "Michelle Turner", email: "michelle@email.com", phone: "555-0105", totalVisits: 3, totalSpent: 900, lastVisit: "2026-04-05" },
];
