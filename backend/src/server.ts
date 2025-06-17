import dotenv from "dotenv";
import app from "./app";
import config from "./config/env.config";

dotenv.config();

app.listen(config.port, () => {
  console.log(`🚀 Server started at http://localhost:${config.port}`);
});
