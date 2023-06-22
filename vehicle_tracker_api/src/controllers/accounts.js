import {
  retrieveAccountDetail,
  performAccountLogin,
  performAccountLogout,
} from '../services';
import loginSchema from '../validators';

export async function login(req, res) {
  try {
    const validatedData = await loginSchema.validateAsync(req.body);
    const token = await performAccountLogin(validatedData);
    return res.status(201).json({ token: token });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function detail(req, res) {}

export async function logout(req, res) {}
