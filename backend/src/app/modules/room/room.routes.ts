import { Router } from "express";
import { RoomService } from "./room.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createRoomSchema,
  updateRoomSchema,
} from "../../validation/room.validation";

const roomRoutes: Router = Router();

roomRoutes.post(
  "/rooms",
  validateRequest(createRoomSchema),
  RoomService.createRoom
);
roomRoutes.get("/rooms", RoomService.getAllRooms);
roomRoutes.get("/rooms/:id", RoomService.getRoomById);
roomRoutes.put(
  "/rooms/:id",
  validateRequest(updateRoomSchema),
  RoomService.updateRoom
);
roomRoutes.delete("/rooms/:id", RoomService.deleteRoom);

export default roomRoutes;
