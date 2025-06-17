import express from "express";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", userRoutes);

app.use(errorHandler);

export default app;
