import {Router} from 'express';

import {
  createTrackerController,
  getAllTrackersController,
  leftFacilityController,
  updateTrackerController,
} from '../../../controllers';

// eslint-disable-next-line new-cap
const trackers = Router();
trackers.route('/').get(getAllTrackersController).post(createTrackerController);
trackers.route('/:id').patch(updateTrackerController);
trackers.route('/:id/out').post(leftFacilityController);

export default trackers;
