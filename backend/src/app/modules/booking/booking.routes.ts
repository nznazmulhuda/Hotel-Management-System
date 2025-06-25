import express from "express";
import { BookingService } from "./booking.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../../validation/booking.validation";
import { permittedRoles } from "../../middlewares/permittedRoles";

const bookingRoute = express.Router();

bookingRoute.post(
  "/bookings",
  validateRequest(createBookingSchema),
  permittedRoles("admin", "front-desk"),
  BookingService.createBooking
);
bookingRoute.get(
  "/bookings",
  permittedRoles("admin", "front-desk"),
  BookingService.getAllBookings
);
bookingRoute.get(
  "/bookings/:id",
  permittedRoles("admin", "front-desk"),
  BookingService.getBookingById
);
bookingRoute.put(
  "/bookings/:id",
  validateRequest(updateBookingSchema),
  permittedRoles("admin", "front-desk"),
  BookingService.updateBooking
);
bookingRoute.delete(
  "/bookings/:id",
  permittedRoles("admin", "front-desk"),
  BookingService.deleteBooking
);

export default bookingRoute;
