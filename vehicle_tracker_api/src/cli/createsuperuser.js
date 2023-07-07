import Joi from 'joi';
import mongoose from 'mongoose';

import {User} from '../models';
import {MONGO_URI} from '../settings';

const createSuperUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(3).required(),
});

/**
 * Create new super user.
 * @param {String} email
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} password
 */
export default async function createsuperuser(
    email,
    firstName,
    lastName,
    password,
) {
  const args = {
    email, firstName, lastName, password,
  };
  const validatedData = await createSuperUserSchema.validateAsync(args);
  const newUser = new User({...validatedData, isAdmin: true});
  await mongoose.connect(MONGO_URI);
  await newUser.save();
}
