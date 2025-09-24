/** @format */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./src/config/logger.js";
import vehicleRoutes from "./src/routes/vehicleRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import notFound from "./src/middleware/notFound.js";

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// log HTTP requests via winston
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// health check
app.get("/health", (req, res) => res.json({ up: true }));

// 404 and errors
app.use(notFound);
app.use(errorHandler);

export default app;
