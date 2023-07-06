import {
  createTrackerService,
  leftFacilityService,
  listTrackerService,
  retrieveTrackerService,
  updateTrackerService,
} from '../services';
import {
  createTrackerSchema,
  outTimeSchema,
  updateTrackerSchema,
} from '../validators';

export const createTrackerController = async (request, response) => {
  try {
    if (request.user.isAdmin) {
      return response.status(403).json(
          {error: 'Only non-admin users can create trackers'},
      );
    }
    const validatedData = await createTrackerSchema.validateAsync(request.body);
    const createdTracker = await createTrackerService(
        validatedData, request.user,
    );
    return response.status(201).json(createdTracker);
  } catch (error) {
    return response.status(500).json({error: 'Failed to create tracker.'});
  }
};

export const updateTrackerController = async (request, response) => {
  if (request.user.isAdmin) {
    return response.status(403).json(
        {error: 'Only non-admin users can update trackers'},
    );
  }
  const {id} = request.params;
  const tracker = await retrieveTrackerService(id);
  if (!tracker) {
    return response.status(404).json({error: 'Tracker not found'});
  }

  try {
    const validatedData = await updateTrackerSchema.validateAsync(request.body);
    const updatedTracker = await updateTrackerService(id, validatedData);
    return response.status(200).json(updatedTracker);
  } catch (error) {
    return response.status(500).json({error: 'Failed to update tracker'});
  }
};

export const getAllTrackersController = async (request, response) => {
  const queryParams = request.query;
  try {
    const trackers = await listTrackerService(queryParams);
    response.status(200).json(trackers);
  } catch (error) {
    response.status(500).json({error: 'Failed to retrieve trackers'});
  }
};

export const leftFacilityController = async (request, response) => {
  if (request.user.isAdmin) {
    return response.status(403).json(
        {error: 'Only non-admin users can update trackers'},
    );
  }
  const {id} = request.params;
  const found = await retrieveTrackerService(id);
  if (!found) {
    return response.status(404).json({detail: 'Not found.'});
  }
  try {
    await outTimeSchema.validateAsync(request.body);
    const tracker = await leftFacilityService(found._id, request.user);
    return response.status(201).json(tracker);
  } catch (e) {
    return response.status(400).json(e);
  }
};
