import {Organization} from '@/models';

/**
 * Create new Organization
 * @param {Object} payload Organization Payload
 * @param {Object} user Request User
 * @return {Object}
 */
export async function createOrganizationService(payload, user) {
  const organizationPayload = {...payload, user: user._id};
  const newOrganization = new Organization(organizationPayload);
  const data = await newOrganization.save();
  return data;
}

/**
 * Paryial Update Existing Organization
 * @param {string} id Organization ID
 * @param {Object} payload Organization PATCH Payload
 * @return {Object}
 */
export async function partialUpdateOrganizationService(id, payload) {
  const data = await Organization.findByIdAndUpdate(id, payload, {new: true});
  return data;
}

/**
 * Returns teh List of Organizations
 * @return {Object[]}
 */
export async function listOrganizationService() {
  const data = await Organization.find().sort('name');
  return data;
}

/**
 * Retrieve Oragnization By ID
 * @param {string} id Organization ID
 * @param {Object} user Request User
 * @return {Object}
 */
export async function retrieveOrganizationService(id, user) {
  const data = await Organization.findOne({_id: id, user: user._id});
  return data;
}
