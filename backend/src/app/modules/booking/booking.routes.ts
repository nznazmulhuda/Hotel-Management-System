import express from "express";
import { BookingService } from "./booking.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../../validation/booking.validation";

const bookingRoute = express.Router();

bookingRoute.post(
  "/bookings",
  validateRequest(createBookingSchema),
  BookingService.createBooking
);
bookingRoute.get("/bookings", BookingService.getAllBookings);
bookingRoute.get("/bookings/:id", BookingService.getBookingById);
bookingRoute.put(
  "/bookings/:id",
  validateRequest(updateBookingSchema),
  BookingService.updateBooking
);
bookingRoute.delete("/bookings/:id", BookingService.deleteBooking);

export default bookingRoute;
