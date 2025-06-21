import { Router } from "express";
import {
  listBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  checkIn,
  checkOut,
  availability,
  cancelBooking,
} from "../controllers/booking.controller";
import { authorizeRoles } from "../middlewares/jwtRole.middleware";

const router = Router();

/* Public for any logged-in staff */
router.get("/bookings", listBookings);
router.get("/bookings/:id", getBooking);
router.get("/availability", availability);

/* Create / edit / delete — FrontDesk or Admin */
router.post("/bookings", authorizeRoles("Admin", "FrontDesk"), createBooking);
router.put("/bookings", authorizeRoles("Admin", "FrontDesk"), updateBooking);
router.delete(
  "/bookings/:id",
  authorizeRoles("Admin", "FrontDesk"),
  deleteBooking
);
router.patch(
  "/bookings/:id/cancel",
  authorizeRoles("Admin", "FrontDesk"),
  cancelBooking
);

/* Check-in / Check-out — FrontDesk only */
router.patch(
  "/bookings/:id/check-in",
  authorizeRoles("Admin", "FrontDesk"),
  checkIn
);
router.patch(
  "/bookings/:id/check-out",
  authorizeRoles("Admin", "FrontDesk"),
  checkOut
);

export default router;
