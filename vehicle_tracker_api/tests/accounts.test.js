import dotenv from 'dotenv';
import mongoose from 'mongoose';
import request from 'supertest';

import {getRequestListener} from '../src/cli/bootstrap';

dotenv.config();

const app = getRequestListener();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('POST /api/v1/accounts/login', () => {
  it('Performs Account Login', async () => {
    const payload = {email: 'test.user@example.com', password: 'foo'};
    const response = await request(app)
        .post('/api/v1/accounts/login')
        .send(payload);
    expect(response.status).toBe(400);
  });
});
