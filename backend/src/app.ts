import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { verifyToken } from "./app/middlewares/verifyToken";
import userRoute from "./app/modules/user/user.routes";
import loginRoute from "./app/modules/auth/auth.routes";
import { checkUserIsActive } from "./app/middlewares/checkUserIsActive";
import guestRoute from "./app/modules/guest/guest.routes";
import roomRoute from "./app/modules/room/room.routes";
import hallRoute from "./app/modules/hall/hall.routes";
import bookingRoute from "./app/modules/booking/booking.routes";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// all routes are here
app.use("/api/auth", loginRoute); // login route

app.use("/api", verifyToken); // jwt token verifier
app.use("/api", checkUserIsActive); // jwt token verifier
app.use("/api", userRoute); // user all route
app.use("/api", guestRoute); // guest all route
app.use("/api", roomRoute); // room all route
app.use("/api", hallRoute); // hall all route
app.use("/api", bookingRoute); // hall all route

// test end point
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "API is working!" });
});

// root
app.get("/", (req: Request, res: Response) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hotel Management - Backend Overview</title>
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    color: #333;
    }

    .container {
    flex: 1;
    width: 90%;
    max-width: 1000px;
    margin: 40px auto;
    }

    h1 {
    font-size: 2.5rem;
    color: #0d2040;
    text-align: center;
    margin-bottom: 20px;
    }

    .section {
    margin-bottom: 40px;
    }

    p,
    ul {
    font-size: 1rem;
    line-height: 1.7;
    color: #555;
    }

    ul {
    list-style: none;
    }

    ul li {
    position: relative;
    margin-bottom: 10px;
    }

    ul li::before {
    content: "•";
    color: #1a73e8;
    font-weight: bold;
    margin-right: 10px;
    font-size: 1.2rem;
    }

    a {
    color: #1a73e8;
    text-decoration: none;
    }

    a:hover {
    text-decoration: underline;
    }

    footer {
    background-color: #bfdbff;
    color: white;
    text-align: center;
    padding: 20px 0;
    margin-top: auto;
    font-size: 0.9rem;
    }

    footer p {
    margin-bottom: 5px;
    }

    footer a {
    color: black;
    font-weight: bold;
    }
</style>
</head>
<body>
<div class="container">
    <h1>Welcome to the Hotel Management System</h1>

    <div class="section">
    <h2>Details</h2>
    <ul>
        <li>
        <strong>Tech Stack:</strong> Node.js, Express.js, MongoDB, Mongoose
        </li>
        <li>
        <strong>Frontend:</strong> React, Redux, TypeScript (separate
        management)
        </li>
        <li>
        <strong>Deployment:</strong> Vercel for frontend, backend hosted
        here
        </li>
    </ul>
    </div>

    <div class="section">
    <h2>Developer Information</h2>
    <p>
        This backend is built and maintained by a dedicated team of
        developers. For more details, contributions, or to report issues,
        visit our GitHub repository.
    </p>
    <p><a href="https://github.com/nznazmulhuda">Nazmul Huda</a></p>
    </div>
</div>

<footer>
    <p>© 2025 Hotel Management | Powered by Node.js & MongoDB</p>
    <p>
    <a href="https://github.com/nznazmulhuda/Hotel-Management-System"
        >GitHub Repository</a
    >
    </p>
</footer>
</body>
</html>
    `);
});

export default app;
