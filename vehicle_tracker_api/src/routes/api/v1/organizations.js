import {Router} from 'express';

import {
  createOrganization,
  listOrganization,
  partialUpdateOrganization,
} from '@/controllers';
import {authenticate} from '@/middlewares';

// eslint-disable-next-line new-cap
const organizations = Router();
organizations
    .route('/')
    .get(authenticate, listOrganization)
    .post(authenticate, createOrganization);
organizations.route('/:id').patch(authenticate, partialUpdateOrganization);

export default organizations;
