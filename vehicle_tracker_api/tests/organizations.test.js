import 'dotenv/config';
import mongoose from 'mongoose';
import supertest from 'supertest';

import {getsupertestListener} from '@/cli/bootstrap';
import {Organization} from '@/models';

const request = supertest(getsupertestListener());

describe('Organization API Tests', () => {
  let authToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const loginPayload = {
      email: 'test.user@email.com',
      password: 'foo',
    };

    const loginResponse = await request
        .post('/api/v1/accounts/login')
        .send(loginPayload);

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Organization.deleteMany({});
  });

  afterEach(async () => {
    await Organization.deleteMany({});
  });

  describe('POST /api/v1/organizations', () => {
    it('Creates a new Organization', async () => {
      const payload = {
        name: 'Test Organization',
        description: 'Test description',
      };

      const response = await request
          .post('/api/v1/organizations')
          .set('Authorization', `Token ${authToken}`)
          .send(payload);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(payload.name);
      expect(response.body.description).toBe(payload.description);
    });
  });

  describe('GET /api/v1/organizations', () => {
    it('Retrieves a list of Organizations', async () => {
      await Organization.create({
        name: 'Organization 1',
        description: 'Description 1',
      });
      await Organization.create({
        name: 'Organization 2',
        description: 'Description 2',
      });

      const response = await request
          .get('/api/v1/organizations')
          .set('Authorization', `Token ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /api/v1/organizations/:id', () => {
    it('Retrieves an Organization by ID', async () => {
      const organization = await Organization.create({
        name: 'Test Organization',
        description: 'Test description',
      });

      const response = await request
          .get(`/api/v1/organizations/${organization._id}`)
          .set('Authorization', `Token ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(organization._id.toString());
      expect(response.body.name).toBe(organization.name);
      expect(response.body.description).toBe(organization.description);
    });

    it('Returns 404 if Organization not found', async () => {
      const response = await request
          .get('/api/v1/organizations/123456789')
          .set('Authorization', `Token ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/v1/organizations/:id', () => {
    it('Updates an Organization partially', async () => {
      const organization = await Organization.create({
        name: 'Test Organization',
        description: 'Test description',
      });

      const payload = {
        name: 'Updated Organization',
      };

      const response = await request
          .patch(`/api/v1/organizations/${organization._id}`)
          .set('Authorization', `Token ${authToken}`)
          .send(payload);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(organization._id.toString());
      expect(response.body.name).toBe(payload.name);
      expect(response.body.description).toBe(organization.description);
    });

    it('Returns 404 if Organization not found', async () => {
      const payload = {
        name: 'Updated Organization',
      };

      const response = await request
          .patch('/api/v1/organizations/123456789')
          .set('Authorization', `Token ${authToken}`)
          .send(payload);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/organizations/:id', () => {
    it('Deletes an Organization', async () => {
      const organization = await Organization.create({
        name: 'Test Organization',
        description: 'Test description',
      });

      const response = await request
          .delete(`/api/v1/organizations/${organization._id}`)
          .set('Authorization', `Token ${authToken}`);

      expect(response.status).toBe(204);
    });

    it('Returns 404 if Organization not found', async () => {
      const response = await request
          .delete('/api/v1/organizations/123456789')
          .set('Authorization', `Token ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});
