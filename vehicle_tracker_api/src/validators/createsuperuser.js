import Joi from 'joi';

const createSuperUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(3).required(),
});

export default createSuperUserSchema;
