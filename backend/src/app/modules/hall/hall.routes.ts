import express from "express";
import { HallService } from "./hall.service";

const hallRoutes = express.Router();

hallRoutes.post("/halls", HallService.createHall);
hallRoutes.get("/halls", HallService.getAllHalls);
hallRoutes.get("/halls/:id", HallService.getHallById);
hallRoutes.patch("/halls/:id", HallService.updateHall);
hallRoutes.delete("/halls/:id", HallService.deleteHall);

export default hallRoutes;
