/** @format */

import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

// Ensure collections and indexes are created
export async function initializeDatabase() {
  // createCollection will no-op if already exists
  await Promise.all([Vehicle.createCollection(), Booking.createCollection()]);

  // Ensure indexes declared in schemas are built
  await Promise.all([Vehicle.syncIndexes(), Booking.syncIndexes()]);
}
