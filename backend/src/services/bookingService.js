/** @format */

import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import AppError from "../utils/AppError.js";

async function createBooking({ vehicleId, fromPincode, toPincode, startTime, endTime, customerId }) {
  // lean is used to return the document as a plain object
  const vehicle = await Vehicle.findById(vehicleId).lean();
  if (!vehicle) throw new AppError("Vehicle not found", 404);

  // Check overlap
  const overlap = await Booking.findOne({
    vehicleId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  }).lean();
  
  if (overlap) throw new AppError("Vehicle is already booked for the selected time window", 409);

  const booking = await Booking.create({ vehicleId, fromPincode, toPincode, startTime, endTime, customerId });
  return booking.toObject();
}

async function getAllBookings() {
  console.log("Fetching all bookings with vehicle details");
  return Booking.find().populate("vehicleId").lean();
}

async function deleteBooking(id) {
  const booking = await Booking.findById(id);
  if (!booking) throw new AppError("Booking not found", 404);
  await booking.deleteOne();
  return;
}

export { createBooking, getAllBookings, deleteBooking }
