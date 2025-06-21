import { Router } from "express";
import {
  listGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controller";
import {
  jwtRoleMiddleware,
  authorizeRoles,
} from "../middlewares/jwtRole.middleware";

const router = Router();

/* Read operations — any logged-in staff */
router.get("/guests", listGuests);
router.get("/guests/:id", getGuest);

/* Write operations — Admin or FrontDesk */
router.post("/guests", authorizeRoles("Admin", "FrontDesk"), createGuest);
router.put("/guests", authorizeRoles("Admin", "FrontDesk"), updateGuest);
router.delete("/guests/:id", authorizeRoles("Admin", "FrontDesk"), deleteGuest);

export default router;
