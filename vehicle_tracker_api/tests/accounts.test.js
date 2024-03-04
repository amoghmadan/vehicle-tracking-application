import 'dotenv/config';
import mongoose from 'mongoose';
import supertest from 'supertest';

import {getsupertestListener} from '@/cli/bootstrap';
import {User} from '@/models';
import {generateKey} from '@/utils/token';

const request = supertest(getsupertestListener());

describe('Account API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.create({
      email: 'test.user@email.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'foo',
      isAdmin: true,
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/v1/accounts/login', () => {
    it('Performs Account Login', async () => {
      const payload = {
        email: 'test.user@email.com',
        password: 'foo',
      };

      const response = await request
          .post('/api/v1/accounts/login')
          .send(payload);

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('GET /api/v1/accounts/detail', () => {
    it('Retrieves Account Details', async () => {
      const user = await User.findOne({
        email: 'test.user@email.com',
      });
      user.token = {key: generateKey()};
      await user.save();

      const response = await request
          .get('/api/v1/accounts/detail')
          .set('Authorization', `Token ${user.token.key}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(user.email);
      expect(response.body.firstName).toBe(user.firstName);
      expect(response.body.lastName).toBe(user.lastName);
    });

    it('Returns 401 if not authorized', async () => {
      const response = await request.get('/api/v1/accounts/detail');

      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /api/v1/accounts/logout', () => {
    it('Performs Account Logout', async () => {
      const user = await User.findOne({
        email: 'test.user@email.com',
      });
      user.token = {key: generateKey()};
      await user.save();

      const response = await request
          .delete('/api/v1/accounts/logout')
          .set('Authorization', `Token ${user.token.key}`);

      expect(response.status).toBe(204);
    });

    it('Returns 401 if not authorized', async () => {
      const response = await request.delete('/api/v1/accounts/logout');

      expect(response.status).toBe(401);
    });
  });
});

// import 'dotenv/config';
// import mongoose from 'mongoose';
// import supertest from 'supertest';

// import {getsupertestListener} from '../src/cli/bootstrap';
// import {User} from '../src/models';
// import {generateKey} from '../src/utils/token';

// const app = getsupertestListener();

// describe('Account API Tests', () => {
//   beforeEach(async () => {
//     await mongoose.connect(process.env.MONGO_URI);
//     await User.create({
//       email: 'test.user@email.com',
//       firstName: 'Test',
//       lastName: 'User',
//       password: 'foo',
//       isAdmin: true,
//     });
//   });

//   afterEach(async () => {
//     await User.findOneAndDelete({email: 'test.user@email.com'});
//     await mongoose.connection.close();
//   });

//   describe('POST /api/v1/accounts/login', () => {
//     it('Performs Account Login', async () => {
//       const payload = {email: 'test.user@email.com', password: 'foo'};
//       const response = await request
//           .post('/api/v1/accounts/login')
//           .send(payload);
//       console.log(response.body);
//       expect(response.status).toBe(201);
//     });
//   });

//   describe('GET /api/v1/accounts/detail', () => {
//     it('Retrieves Account Details', async () => {
//       const user = await User.findOne({email: 'test.user@email.com'});
//       if (!user.token) {
//         user.token = {key: generateKey()};
//         await user.save();
//       }
//       console.log(user.token);

//       const response = await request
//           .get('/api/v1/accounts/detail')
//           .set('Authorization', `Token ${user.token.key}`);

//       console.log(response.body);
//       expect(response.status).toBe(200);
//     });
//   });

//   describe('DELETE /api/v1/accounts/logout', () => {
//     it('Performs Account Logout', async () => {
//       const user = await User.findOne({email: 'test.user@email.com'});
//       console.log(user.token);
//       if (!user.token) {
//         user.token = {key: generateKey()};
//         await user.save();
//       }
//       console.log(user.token);

//       const response = await request
//           .delete('/api/v1/accounts/logout')
//           .set('Authorization', `Token ${user.token.key}`);
//       console.log(response.body);
//       expect(response.status).toBe(204);
//     });
//   });
// });
