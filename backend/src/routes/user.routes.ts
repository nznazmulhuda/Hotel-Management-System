import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers as any); // get all user
router.get("/user", getSingleUser as any); // get single user by pass id as query
router.post("/user", createUser as any); // add new user
router.put("/user", updateUser as any); // update user
router.delete("/user", deleteUser as any); // update user

export default router;
