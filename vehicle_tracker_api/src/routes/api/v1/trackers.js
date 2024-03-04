import {Router} from 'express';

import {
  createTrackerController,
  leftFacilityController,
  listTrackerController,
  updateTrackerController,
} from '@/controllers';
import {authenticate} from '@/middlewares';

// eslint-disable-next-line new-cap
const trackers = Router();
trackers
    .route('/')
    .get(authenticate, listTrackerController)
    .post(authenticate, createTrackerController);
trackers.route('/:id').patch(authenticate, updateTrackerController);
trackers.route('/:id/out').post(authenticate, leftFacilityController);

export default trackers;
