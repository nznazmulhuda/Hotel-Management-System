import express from "express";
import { HallService } from "./hall.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createHallSchema,
  updateHallSchema,
} from "../../validation/hall.validation";
import { permittedRoles } from "../../middlewares/permittedRoles";

const hallRoutes = express.Router();

hallRoutes.post(
  "/hall",
  permittedRoles("admin", "front-desk"),
  HallService.createHall
);
hallRoutes.get(
  "/halls",
  permittedRoles("admin", "front-desk"),
  HallService.getAllHalls
);
hallRoutes.get(
  "/hall/:id",
  permittedRoles("admin", "front-desk"),
  HallService.getHallById
);
permittedRoles("admin", "front-desk"),
  hallRoutes.put(
    "/hall/:id",
    permittedRoles("admin", "front-desk"),
    HallService.updateHall
  );
hallRoutes.delete(
  "/hall/:id",
  permittedRoles("admin", "front-desk"),
  HallService.deleteHall
);

export default hallRoutes;
