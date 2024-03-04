import {Router} from 'express';

import {detail, login, logout} from '@/controllers';
import {authenticate} from '@/middlewares';

// eslint-disable-next-line new-cap
const accounts = Router();
accounts.route('/login').post(login);
accounts.route('/detail').get(authenticate, detail);
accounts.route('/logout').delete(authenticate, logout);

export default accounts;
