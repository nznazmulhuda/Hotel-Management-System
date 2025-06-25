import { Router } from "express";
import { RoomService } from "./room.service";

const roomRoutes: Router = Router();

roomRoutes.post("/rooms", RoomService.createRoom);
roomRoutes.get("/rooms", RoomService.getAllRooms);
roomRoutes.get("/rooms/:id", RoomService.getRoomById);
roomRoutes.patch("/rooms/:id", RoomService.updateRoom);
roomRoutes.delete("/rooms/:id", RoomService.deleteRoom);

export default roomRoutes;
