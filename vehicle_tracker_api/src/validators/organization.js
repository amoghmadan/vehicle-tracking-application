import Joi from 'joi';

export const createOrganizationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  isActive: Joi.boolean().required(),
});

export const updateOrganizationSchema = Joi.object({
  name: Joi.string().min(1),
  isActive: Joi.boolean(),
});
