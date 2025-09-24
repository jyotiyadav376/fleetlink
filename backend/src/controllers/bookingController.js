/** @format */

import { createBooking, deleteBooking, getAllBookings } from "../services/bookingService.js";
import { calculateRideDurationHours } from "../utils/calculateRideDuration.js";

async function bookVehicle(req, res, next) {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
    const start = new Date(startTime);
    const estimatedRideDurationHours = calculateRideDurationHours(fromPincode, toPincode);
    const bookingEndTime = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);
    const booking = await createBooking({ vehicleId, fromPincode, toPincode, startTime: start, endTime: bookingEndTime, customerId });
    return res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

async function getBookings(req, res, next) {
  try {
    const bookings = await getAllBookings();
    return res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
}

async function cancelBooking(req, res, next) {
  try {
    const { id } = req.params;
    await deleteBooking(id);
    return res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
}

export { bookVehicle, getBookings, cancelBooking };


