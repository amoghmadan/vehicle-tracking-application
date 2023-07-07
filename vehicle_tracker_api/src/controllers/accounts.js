import {
  performLoginService,
  performLogoutService,
  retrieveUserService,
} from '../services';
import {loginSchema} from '../validators';

/**
 * Account Login API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function login(request, response) {
  try {
    const validatedData = await loginSchema.validateAsync(request.body);
    const data = await performLoginService(validatedData);
    if (!data) {
      return response.status(401).json({detail: 'Invalid credentials!'});
    }
    return response.status(201).json(data);
  } catch (e) {
    return response.status(400).json(e);
  }
}

/**
 * Account Detail API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function detail(request, response) {
  const data = await retrieveUserService(request.user);
  return response.status(200).json(data);
}

/**
 * Account Logout API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function logout(request, response) {
  const data = await performLogoutService(request.user);
  return response.status(204).json(data);
}
