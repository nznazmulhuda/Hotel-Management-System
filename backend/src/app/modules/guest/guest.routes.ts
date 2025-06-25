import { Router } from "express";
import GuestService from "./guest.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createGuestZodSchema,
  updateGuestZodSchema,
} from "../../validation/guest.validation";
import { permittedRoles } from "../../middlewares/permittedRoles";

const guestRoute: Router = Router();

guestRoute.get(
  "/guests",
  permittedRoles("admin", "front-desk"),
  GuestService.getAllGuest
);
guestRoute.get(
  "/guest",
  permittedRoles("admin", "front-desk"),
  GuestService.getSingleGuest
);
guestRoute.post(
  "/guest",
  permittedRoles("admin", "front-desk"),
  validateRequest(createGuestZodSchema),
  GuestService.addNewGuest
);
guestRoute.put(
  "/guest/:id",
  permittedRoles("admin", "front-desk"),
  validateRequest(updateGuestZodSchema),
  GuestService.updateGuest
);
guestRoute.patch(
  "/guest/:id",
  permittedRoles("admin", "front-desk"),
  GuestService.updateStatus
);
guestRoute.delete(
  "/guest/:id",
  permittedRoles("admin", "front-desk"),
  GuestService.deleteGuest
);

export default guestRoute;
