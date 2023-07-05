import {Schema, model} from 'mongoose';

const tokenSchema = new Schema({
  key: {type: String, require: true, unique: true},
}, {timestamps: {createdAt: 'created'}});

const userSchema = new Schema({
  email: {type: String, require: true, unique: true},
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  password: {type: String, require: true},
  isAdmin: {type: Boolean, require: false, default: false},
  isActive: {type: Boolean, require: true, default: true},
  dateJoined: {type: Date, require: true, default: Date.now},
  lastLogin: {type: Date, require: false},
  token: {type: tokenSchema, require: false},
});

const User = model('User', userSchema);

export default User;
