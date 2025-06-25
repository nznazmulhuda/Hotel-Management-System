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
  "/room",
  permittedRoles("admin", "front-desk"),
  RoomService.createRoom
);
roomRoutes.get(
  "/rooms",
  permittedRoles("admin", "front-desk"),
  RoomService.getAllRooms
);
roomRoutes.get(
  "/room/:id",
  permittedRoles("admin", "front-desk"),
  RoomService.getRoomById
);
roomRoutes.put(
  "/room/:id",
  permittedRoles("admin", "front-desk"),
  RoomService.updateRoom
);
roomRoutes.delete(
  "/room/:id",
  permittedRoles("admin", "front-desk"),
  RoomService.deleteRoom
);

export default roomRoutes;
