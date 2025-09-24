/** @format */

import Joi from "joi";

const bookingSchema = Joi.object({
  vehicleId: Joi.string().hex().length(24).required(),
  fromPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  toPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  startTime: Joi.date().iso().required(),
  customerId: Joi.string().min(3).required(),
});

export { bookingSchema };
