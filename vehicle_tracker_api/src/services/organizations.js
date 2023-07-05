import {Organization} from '../models';

export async function createOrganizationService(payload, user) {
  const organizationPayload = {...payload, user: user._id};
  const newOrganization = new Organization(organizationPayload);
  const data = await newOrganization.save();
  return data;
}

export async function partialUpdateOrganizationService(id, payload) {
  const data = await Organization.findByIdAndUpdate(id, payload, {new: true});
  return data;
}

export async function listOrganizationService() {
  const data = await Organization.find().sort('name');
  return data;
}

export async function retrieveOrganizationService(id, user) {
  const data = await Organization.findOne({_id: id, user: user._id});
  return data;
}
