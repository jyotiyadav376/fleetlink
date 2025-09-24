/** @format */

import AppError from "../utils/AppError.js";

const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      const details = error.details.map((d) => d.message);
      return next(new AppError(`Validation error: ${details.join(", ")}`, 400));
    }
    next();
  };
};

export default validateRequest;
