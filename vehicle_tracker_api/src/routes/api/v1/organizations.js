import {Router} from 'express';

import {
  createOrganization,
  listOrganization,
  partialUpdateOrganization,
} from '../../../controllers';

// eslint-disable-next-line new-cap
const organizations = Router();
organizations.route('/').get(listOrganization).post(createOrganization);
organizations.route('/:id').patch(partialUpdateOrganization);

export default organizations;
