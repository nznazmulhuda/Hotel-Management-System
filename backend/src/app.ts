import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", authRoutes); // authentications
app.use("/api/v1", userRoutes); // user all routes

app.use(errorHandler);

export default app;
