import { Router } from "express";
import { AuthController } from "./auth.service";
import { verifyToken } from "../../middlewares/verifyToken";

const router = Router();

router.post("/login", AuthController.login);
router.post("/verify-email", AuthController.sendVerification);
router.get("/verify-email", AuthController.verifyEmail);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/change-password", verifyToken, AuthController.changePassword);

export default router;
