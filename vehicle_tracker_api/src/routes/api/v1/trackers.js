import {Router} from 'express';

import {
  createTrackerController,
  leftFacilityController,
  listTrackerController,
  updateTrackerController,
} from '../../../controllers';

// eslint-disable-next-line new-cap
const trackers = Router();
trackers.route('/').get(listTrackerController).post(createTrackerController);
trackers.route('/:id').patch(updateTrackerController);
trackers.route('/:id/out').post(leftFacilityController);

export default trackers;
