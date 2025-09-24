/** @format */

import Joi from "joi";

const addVehicleSchema = Joi.object({
  name: Joi.string().min(2).required(),
  capacityKg: Joi.number().positive().required(),
  tyres: Joi.number().integer().min(2).required(),
});

const availableVehicleSchema = Joi.object({
  capacityRequired: Joi.number().positive().required(),
  fromPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  toPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  startTime: Joi.date().iso().required(),
});

export { addVehicleSchema, availableVehicleSchema };
