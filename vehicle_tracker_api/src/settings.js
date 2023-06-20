import path from 'path';

export const BASE_DIR = path.dirname(path.dirname(__filename));

export const MONGO_URI = 'mongo://localhost:27017/vehicletracker';

export const SALT = 12;
