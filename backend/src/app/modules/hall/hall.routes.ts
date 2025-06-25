import express from "express";
import { HallService } from "./hall.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createHallSchema,
  updateHallSchema,
} from "../../validation/hall.validation";

const hallRoutes = express.Router();

hallRoutes.post(
  "/halls",
  validateRequest(createHallSchema),
  HallService.createHall
);
hallRoutes.get("/halls", HallService.getAllHalls);
hallRoutes.get("/halls/:id", HallService.getHallById);
hallRoutes.put(
  "/halls/:id",
  validateRequest(updateHallSchema),
  HallService.updateHall
);
hallRoutes.delete("/halls/:id", HallService.deleteHall);

export default hallRoutes;
