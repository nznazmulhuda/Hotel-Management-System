type BookingItemType = "room" | "hall";

interface IBooking {
  guest: any;
  itemType: BookingItemType;
  itemId: any;
  checkInDate: Date;
  checkOutDate: Date;
  bookingStatus: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid" | "refunded";
  totalAmount: number;
  paymentMethod?: "cash" | "card" | "mobile-banking";
  specialNote?: string;
}
