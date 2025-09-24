/** @format */

import { addVehicle as addVehicleService, findAvailableVehicles } from "../services/vehicleService.js";
import { calculateRideDurationHours } from "../utils/calculateRideDuration.js";

async function addVehicleHandler(req, res, next) {
  try {
    const vehicle = await addVehicleService(req.body);
    return res.status(201).json({ success: true, data: vehicle });
  } catch (err) {
    next(err);
  }
}

async function getAvailableVehicles(req, res, next) {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    const start = new Date(startTime);
    const duration = calculateRideDurationHours(fromPincode, toPincode);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const available = await findAvailableVehicles({ capacityRequired: Number(capacityRequired), startTime: start, endTime: end });
    return res.json({ success: true, data: available, estimatedRideDurationHours: duration });
  } catch (err) {
    next(err);
  }
}

export { addVehicleHandler as addVehicle, getAvailableVehicles };
