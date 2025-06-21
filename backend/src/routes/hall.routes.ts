import { Router } from "express";
import {
  listHalls,
  createHall,
  updateHall,
  deleteHall,
  listHallBookings,
  createHallBooking,
  updateHallBooking,
  deleteHallBooking,
  hallAvailability,
} from "../controllers/hall.controller";
import { authorizeRoles } from "../middlewares/jwtRole.middleware";

const router = Router();

/* ---- Hall CRUD (Admin) ---- */
router.get("/halls", listHalls);
router.post("/halls", authorizeRoles("Admin"), createHall);
router.put("/halls", authorizeRoles("Admin"), updateHall);
router.delete("/halls/:id", authorizeRoles("Admin"), deleteHall);

/* ---- Booking CRUD ---- */
router.get("/hall-bookings", listHallBookings);
router.get("/hall-availability", hallAvailability);

router.post(
  "/hall-bookings",
  authorizeRoles("Admin", "FrontDesk"),
  createHallBooking
);
router.put(
  "/hall-bookings",
  authorizeRoles("Admin", "FrontDesk"),
  updateHallBooking
);
router.delete(
  "/hall-bookings/:id",
  authorizeRoles("Admin", "FrontDesk"),
  deleteHallBooking
);

export default router;
