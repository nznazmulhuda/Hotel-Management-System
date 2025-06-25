import { Booking } from "./booking.model";

export class BookingController {
  static async createBooking(data: IBooking): Promise<IBooking> {
    const booking = await Booking.create(data);
    if (!booking) throw new Error("Booking creation failed");
    return booking;
  }

  static async getAllBookings() {
    return await Booking.find({})
      .populate("guest", "name email number")
      .populate("itemId"); // will populate either Room or Hall depending on itemType
  }

  static async getBookingById(id: string) {
    const booking = await Booking.findById(id)
      .populate("guest", "name email number")
      .populate("itemId");
    if (!booking) throw new Error("Booking not found");
    return booking;
  }

  static async updateBooking(id: string, data: Partial<IBooking>) {
    const updatedBooking = await Booking.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedBooking) throw new Error("Booking update failed");
    return updatedBooking;
  }

  static async deleteBooking(id: string) {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) throw new Error("Booking delete failed");
    return deletedBooking;
  }

  // Check availability for room or hall
  static async isItemAvailable(
    itemType: string,
    itemId: string,
    checkIn: Date,
    checkOut: Date
  ): Promise<boolean> {
    const conflictingBookings = await Booking.find({
      itemType,
      itemId,
      bookingStatus: { $in: ["pending", "confirmed"] },
      $or: [
        {
          checkInDate: { $lt: checkOut, $gte: checkIn },
        },
        {
          checkOutDate: { $gt: checkIn, $lte: checkOut },
        },
        {
          checkInDate: { $lte: checkIn },
          checkOutDate: { $gte: checkOut },
        },
      ],
    });
    return conflictingBookings.length === 0;
  }
}
