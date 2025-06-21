import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
} from "../controllers/user.controller";
import {
  authorizeRoles,
  jwtRoleMiddleware,
} from "../middlewares/jwtRole.middleware";

const router = Router();
router.use(jwtRoleMiddleware as any);

router.get("/users", authorizeRoles("Admin"), getUsers as any); // get all user
router.get("/user", authorizeRoles("Admin"), getSingleUser as any); // get single user by pass id as query
router.post("/user", authorizeRoles("Admin"), createUser as any); // add new user
router.put("/user", authorizeRoles("Admin"), updateUser as any); // update user
router.delete("/user", authorizeRoles("Admin"), deleteUser as any); // delete user

export default router;
