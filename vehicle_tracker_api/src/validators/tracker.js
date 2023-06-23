import Joi from 'joi';

export const createTrackerSchema = Joi.object({
  vehicleNumber: Joi.string().min(1).required(),
  organization: Joi.string().min(7).required(),
});

export const updateTrackerSchema = Joi.object({
  vehicleNumber: Joi.string().min(1),
  organization: Joi.string().min(7),
});
