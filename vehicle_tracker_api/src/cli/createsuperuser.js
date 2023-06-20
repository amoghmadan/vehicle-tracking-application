import { hashSync } from 'bcryptjs';
import mongoose from 'mongoose';

import { User } from '../models';
import { MONGO_URI, SALT } from '../settings';
import createSuperUserSchema from '../validators/createsuperuser';

export default async function createsuperuser(email, firstName, lastName, password) {
    const args = { email, firstName, lastName, password };
    const validatedData = await createSuperUserSchema.validateAsync(args);
    validatedData.password = hashSync(validatedData.password, SALT);
    validatedData.isAdmin = true;
    const newUser = new User(validatedData);
    await mongoose.connect(MONGO_URI);
    await newUser.save();
}
