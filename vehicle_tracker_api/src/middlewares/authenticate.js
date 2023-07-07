import {STATUS_CODES} from 'http';

import {User} from '../models';

const EXCLUDE_URLS = ['/api/v1/accounts/login'];

/**
 * Authenticate users.
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 * @return {Promise<express.Response | void>}
 */
export default async function authenticate(request, response, next) {
  if (EXCLUDE_URLS.includes(request.path)) {
    return next();
  }
  const keyword = 'Token';
  const authorization = request.headers?.authorization;
  if (!authorization) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  const values = authorization.split(' ');
  if (values.length !== 2) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  if (keyword.toLowerCase() !== values[0].toLowerCase()) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  const user = await User.findOne({
    'token.key': values[1],
  });
  if (!user) {
    return response.status(403).json({detail: STATUS_CODES[403]});
  }
  request.user = user;
  return next();
}
