import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { UserModel } from './models';
import server from './server';

describe('User API', () => {
  before(async function () {
    this.timeout(10000); // Aumenta timeout para evitar falhas por demora

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || "mongodb://admin:secret@localhost:27017/tests?authSource=admin", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });
  const request = supertest(server);
  let userId: string;
  let token: string;

  after(async () => {
    await UserModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/signin', () => {
    it('should SignIn the user', async () => {
      const response = await request
        .post('/api/signin')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          address: '456 New St, Test City',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).to.have.property('message', 'User created');
      expect(response.body).to.have.property('user');

      const user = response.body.rows[0];
      expect(user).to.have.property('name', 'Test User');
      expect(user).to.have.property('email', 'test@email.com');
    });
  });

  // describe('POST /api/login', () => {
  //   it('should fetch user details', async () => {
  //     const response = await request
  //       .post('/api/login')
  //       .send({
  //         name: 'John Doe',
  //         email: 'john@example.com',
  //         address: '456 New St, Test City',
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body).to.have.property('token');
  //     expect(response.body).to.have.property('user');

  //     const user = response.body.rows[0];
  //     expect(user).to.have.property('name', 'Test User');
  //     expect(user).to.have.property('email', 'test@email.com');
  //   });
  // });

  // describe('GET /api/user', () => {
  //   it('should fetch user details', async () => {
  //     const response = await request
  //       .get('/api/user')
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body).to.have.property('rows');
  //     expect(response.body.rows).to.be.an('array');
  //     expect(response.body.rows.length).to.be.greaterThan(0);

  //     const user = response.body.rows[0];
  //     expect(user).to.have.property('name', 'Test User');
  //     expect(user).to.have.property('email', 'test@email.com');
  //   });
  // });

  // describe('GET /users/:id', () => {
  //   it('should fetch a specific user by ID', async () => {
  //     const response = await request
  //       .get(`/users/${userId}`)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body).to.have.property('name', 'Test User');
  //     expect(response.body).to.have.property('email', 'test@email.com');
  //   });

  //   it('should return 404 for non-existent user', async () => {
  //     const fakeId = new mongoose.Types.ObjectId();
  //     await request.get(`/users/${fakeId}`).expect(404);
  //   });
  // });
});
