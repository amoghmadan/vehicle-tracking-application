import {STATUS_CODES} from 'http';

import {
  createOrganizationService,
  listOrganizationService,
  partialUpdateOrganizationService,
  retrieveOrganizationService,
} from '../services';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from '../validators';

/**
 * Create new Organization API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function createOrganization(request, response) {
  if (!request.user.isAdmin) {
    return response.status(401).json(
        {detail: STATUS_CODES[401]},
    );
  }
  try {
    const validatedData = await createOrganizationSchema.validateAsync(
        request.body,
    );
    const data = await createOrganizationService(validatedData, request.user);
    return response.status(201).json(data);
  } catch (e) {
    return response.status(400).json(e);
  }
}

/**
 * List All Organization API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function listOrganization(request, response) {
  const data = await listOrganizationService(request.user);
  return response.status(200).json(data);
}

/**
 * Partial Update Organization API
 * @param {express.Request} request Request Object
 * @param {express.Response} response Response Object
 * @return {express.Response} Final Response
 */
export async function partialUpdateOrganization(request, response) {
  if (!request.user.isAdmin) {
    return response.status(401).json(
        {detail: STATUS_CODES[401]},
    );
  }
  const {id} = request.params;
  const organization = await retrieveOrganizationService(id, request.user);

  if (!organization) {
    return response.status(404).json({detail: STATUS_CODES[404]});
  }

  try {
    const validatedData = await updateOrganizationSchema.validateAsync(
        request.body,
    );
    const data = await partialUpdateOrganizationService(
        organization._id, validatedData,
    );
    return response.status(200).json(data);
  } catch (e) {
    return response.status(400).json(e);
  }
}
