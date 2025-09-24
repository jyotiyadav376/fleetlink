/** @format */

import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

async function addVehicle(data) {
  const vehicle = await Vehicle.create(data);
  return vehicle.toObject();
}

async function findAvailableVehicles({ capacityRequired, startTime, endTime }) {
  // First filter by capacity
  const candidates = await Vehicle.find({ capacityKg: { $gte: capacityRequired } }).lean();
  if (candidates.length === 0) return [];

  const vehicleIds = candidates.map((v) => v._id);

  // Find vehicles with overlapping bookings in the window
  const overlaps = await Booking.aggregate([{ $match: { vehicleId: { $in: vehicleIds }, startTime: { $lt: endTime }, endTime: { $gt: startTime } } }, { $group: { _id: "$vehicleId" } }]);

  const busySet = new Set(overlaps.map((o) => String(o._id)));
  const available = candidates.filter((v) => !busySet.has(String(v._id)));
  return available;
}

export { addVehicle, findAvailableVehicles };
