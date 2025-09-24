/** @format */

import express from "express";
const router = express.Router();
import { addVehicle, getAvailableVehicles } from "../controllers/vehicleController.js";
import validateRequest from "../middleware/validateRequest.js";
import { addVehicleSchema, availableVehicleSchema } from "../validations/vehicleValidation.js";

router.post("/", validateRequest(addVehicleSchema), addVehicle);
router.get("/available", validateRequest(availableVehicleSchema, "query"), getAvailableVehicles);

export default router;
