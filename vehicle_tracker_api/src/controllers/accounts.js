import { performLoginService, performLogoutService, retrieveUserService } from '../services';
import { loginSchema } from '../validators';

function handleErrorResponse(response, statusCode, message) {
  return response.status(statusCode).json({ detail: message });
}

export async function login(request, response) {
  try {
    const validatedData = await loginSchema.validateAsync(request.body);
    const data = await performLoginService(validatedData);

    if (!data) {
      return handleErrorResponse(response, 401, 'Invalid credentials!');
    }

    return response.status(201).json(data);
  } catch (error) {
    return handleErrorResponse(response, 400, error);
  }
}

export async function detail(request, response) {
  const data = await retrieveUserService(request.user);
  return response.status(200).json(data);
}

export async function logout(request, response) {
  const data = await performLogoutService(request.user);
  return response.status(204).json(data);
}
