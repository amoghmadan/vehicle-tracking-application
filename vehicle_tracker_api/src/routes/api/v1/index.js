import { Router } from 'express';

import accounts from './accounts';
import organizations from './organizations';
import trackers from './trackers';

const urlpatterns = new Map([
  ['/accounts', accounts],
  ['/organizations', organizations],
  ['/trackers', trackers],
]);

const v1 = Router();
urlpatterns.forEach((router, pattern) => {
  v1.use(pattern, router);
});

export default v1;
