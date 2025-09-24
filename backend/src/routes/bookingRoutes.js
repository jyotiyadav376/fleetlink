/** @format */

import express from "express";
const router = express.Router();
import { bookVehicle, cancelBooking, getBookings } from "../controllers/bookingController.js";
import validateRequest from "../middleware/validateRequest.js";
import { bookingSchema } from "../validations/bookingValidation.js";

router.post("/", validateRequest(bookingSchema), bookVehicle);

router.get("/", getBookings);

router.delete("/:id", cancelBooking);

export default router;
