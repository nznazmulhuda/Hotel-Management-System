import express from "express";
import { BookingService } from "./booking.service";

const bookingRoute = express.Router();

bookingRoute.post("/bookings", BookingService.createBooking);
bookingRoute.get("/bookings", BookingService.getAllBookings);
bookingRoute.get("/bookings/:id", BookingService.getBookingById);
bookingRoute.patch("/bookings/:id", BookingService.updateBooking);
bookingRoute.delete("/bookings/:id", BookingService.deleteBooking);

export default bookingRoute;
