import { Router } from 'express';

import accounts from './accounts';

const urlpatterns = new Map([
  ['/accounts', accounts],
]);

const api = Router();
urlpatterns.forEach((router, pattern) => {
  api.use(pattern, router);
});

export default api;
