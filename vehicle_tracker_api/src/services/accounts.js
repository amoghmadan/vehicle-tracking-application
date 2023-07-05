import {compareSync} from 'bcryptjs';
import {User} from '../models';
import {generateKey} from '../utils/token';

export async function performLoginService(payload) {
  const user = await User.findOne({email: payload.email, isActive: true});

  if (!user) return null;
  if (!compareSync(payload.password, user.password)) return null;
  if (!user.token) {
    user.token = {key: generateKey()};
    user.lastLogin = user.token.created;
    await user.save();
  }

  return {token: user.token.key};
}

export async function retrieveUserService(user) {
  const detail = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateJoined: user.dateJoined,
  };

  return detail;
}

export async function performLogoutService(user) {
  user.set('token', undefined, {strict: false});
  await user.save();

  return {};
}
