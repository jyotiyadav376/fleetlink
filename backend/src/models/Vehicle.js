/** @format */

import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    capacityKg: { type: Number, required: true, min: 1 },
    tyres: { type: Number, required: true, min: 2 },
  },
  { timestamps: true }
);

export default model("Vehicle", vehicleSchema);
