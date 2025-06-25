import { Router } from "express";
import { RoomService } from "./room.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createRoomSchema,
  updateRoomSchema,
} from "../../validation/room.validation";
import { permittedRoles } from "../../middlewares/permittedRoles";

const roomRoutes: Router = Router();

roomRoutes.post(
  "/rooms",
  validateRequest(createRoomSchema),
  permittedRoles("admin", "front-desk"),
  RoomService.createRoom
);
roomRoutes.get(
  "/rooms",
  permittedRoles("admin", "front-desk"),
  RoomService.getAllRooms
);
roomRoutes.get(
  "/rooms/:id",
  permittedRoles("admin", "front-desk"),
  RoomService.getRoomById
);
roomRoutes.put(
  "/rooms/:id",
  validateRequest(updateRoomSchema),
  permittedRoles("admin", "front-desk"),
  RoomService.updateRoom
);
roomRoutes.delete(
  "/rooms/:id",
  permittedRoles("admin", "front-desk"),
  RoomService.deleteRoom
);

export default roomRoutes;
