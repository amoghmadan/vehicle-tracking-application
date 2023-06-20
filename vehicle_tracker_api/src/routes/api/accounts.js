import { Router } from 'express';

import { detail, login, logout } from '../../controllers/accounts';

const accounts = Router();
accounts.route('/login').post(login);
accounts.route('/detail').get(detail);
accounts.route('/logout').delete(logout);

export default accounts;
