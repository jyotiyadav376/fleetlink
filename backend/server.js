/** @format */

import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./src/config/db.js";
import { initializeDatabase } from "./src/config/dbInit.js";
import logger from "./src/config/logger.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    logger.info("MongoDB connected successfully Jyoti");
    await initializeDatabase();
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
})();
