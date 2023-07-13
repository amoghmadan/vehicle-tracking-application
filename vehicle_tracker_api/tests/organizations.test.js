// import 'dotenv/config';
// import mongoose from 'mongoose';
// import request from 'supertest';

// import {getRequestListener} from '../src/cli/bootstrap';
// import {User} from '../src/models';
// import {generateKey} from '../src/utils/token';

// const app = getRequestListener();

// let user;
// let token;

// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   user = await User.findOne({email: 'gauravsinghgzp83@gmail.com'});
//   if (!user.token) {
//     user.token = {key: generateKey()};
//     user.lastLogin = new Date();
//     await user.save();
//   }
//   token = user.token.key;
// });

// afterEach(async () => {
//   user.set('token', undefined, {strict: false});
//   await user.save();
//   await mongoose.connection.close();
// });

// describe('GET /api/v1/organizations/', () => {
//   it('List All Organizations', async () => {
//     const response = await request(app)
//         .get('/api/v1/organizations/')
//         .set({Authorization: `Token ${token}`});
//     expect(response.status).toBe(200);
//   });
// });
