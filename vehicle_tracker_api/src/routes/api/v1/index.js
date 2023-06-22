import { Router } from 'express';

import accounts from './accounts';

const urlpatterns = new Map([['/accounts', accounts]]);

const v1 = Router();
urlpatterns.forEach((router, pattern) => {
  v1.use(pattern, router);
});

export default v1;
