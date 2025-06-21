import { Router } from "express";
import {
  listRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  listRooms,
  getRoom,
  createRoomWithImages,
  updateRoom,
  deleteRoom,
  changeRoomStatus,
} from "../controllers/room.controller";
import { upload } from "../utils/multer";
import { authorizeRoles } from "../middlewares/jwtRole.middleware";

const router = Router();

/* -------- Room-Type Routes -------- */
router.get("/room-types", listRoomTypes);
router.post("/room-types", authorizeRoles("Admin"), createRoomType);
router.put("/room-types/:id", authorizeRoles("Admin"), updateRoomType);
router.delete("/room-types/:id", authorizeRoles("Admin"), deleteRoomType);

/* -------- Room Routes -------- */
router.get("/rooms", listRooms);
router.get("/rooms/:id", getRoom);

router.post(
  "/rooms",
  authorizeRoles("Admin", "FrontDesk"),
  upload.array("images", 5), // multipart files under key "images"
  createRoomWithImages
);

router.put(
  "/rooms",
  authorizeRoles("Admin", "FrontDesk"),
  upload.array("images", 5), // Multer: key = images
  updateRoom
);
router.delete("/rooms/:id", authorizeRoles("Admin"), deleteRoom);
router.patch(
  "/rooms/:id/status",
  authorizeRoles("Admin", "FrontDesk"),
  changeRoomStatus
);

export default router;
