/** @format */

import { Schema, model, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    vehicleId: { type: Types.ObjectId, ref: "Vehicle", required: true, index: true },
    fromPincode: { type: String, required: true },
    toPincode: { type: String, required: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true, index: true },
    customerId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Booking", bookingSchema);
