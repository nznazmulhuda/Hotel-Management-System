import { Router } from "express";
import {
  createUserOnDB,
  deleteUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserData,
  updateUserStatus,
} from "./user.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  createUserZodSchema,
  updateUserZodSchema,
} from "../../validation/user.validation";
import { permittedRoles } from "../../middlewares/permittedRoles";

const userRoute: Router = Router();

// endpoint
userRoute.get("/users", permittedRoles("admin"), getAllUserFromDB); // get all user
userRoute.get("/user/:id", permittedRoles("admin"), getSingleUserFromDB); // get single user
userRoute.post(
  "/user",
  permittedRoles("admin"),
  validateRequest(createUserZodSchema),
  createUserOnDB
); // create new user
userRoute.put(
  "/user/:id",
  validateRequest(updateUserZodSchema),
  updateUserData
);
userRoute.patch("/user/:id/status", permittedRoles("admin"), updateUserStatus); // update user status
userRoute.delete("/user/:id", permittedRoles("admin"), deleteUserFromDB); // delete user

export default userRoute;
