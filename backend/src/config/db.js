/** @format */

import mongoose from "mongoose";

async function connectDB(mongoUri) {
  const connectionString = mongoUri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fleetlink";
  mongoose.set("strictQuery", true);
  mongoose.set("autoCreate", true); // ensure collections can be auto-created
  await mongoose.connect(connectionString, {
    autoIndex: true,
  });
  return mongoose.connection;
}

export { connectDB };
