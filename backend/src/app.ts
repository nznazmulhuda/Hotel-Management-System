import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";
import hallRoutes from "./routes/hall.routes";
import guestRoutes from "./routes/guest.routes";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/v1", authRoutes); // authentications
app.use("/api/v1", userRoutes); // user all routes
app.use("/api/v1", roomRoutes); // room all routes
app.use("/api/v1", guestRoutes); // guest data add
app.use("/api/v1", bookingRoutes); // booking all routes
app.use("/api/v1", hallRoutes); // hall booking

app.use(errorHandler);

export default app;
