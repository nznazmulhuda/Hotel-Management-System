import { Router } from "express";
import { AuthController } from "./auth.service";

const loginRoute = Router();

loginRoute.post("/login", AuthController.login);

export default loginRoute;
