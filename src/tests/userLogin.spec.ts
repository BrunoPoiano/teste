import { Server } from 'http';
import supertest from 'supertest';
import startServer from '../server';
import { UserModel } from '../models';
import GeoLib from '../lib';

describe('User API', () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    server = await startServer();
    request = supertest(server);

    await request
      .post('/api/signin')
      .send(
        JSON.stringify({
          email: 'bruno@teste.com',
          name: 'Bruno',
          address:
            '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
        })
      )
      .set('Content-Type', 'application/json');
  });

  afterAll(async () => {
    await UserModel.deleteMany({});

    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        resolve();
        process.env.NODE_ENV = 'dev';
      });
    });
  });

  beforeEach(async () => {
    // await UserModel.deleteMany({});
  });

  describe('POST /api/login', () => {
    it('should SignIn the user', async () => {
      const response = await request
        .post('/api/login')
        .send(
          JSON.stringify({
            email: 'bruno@teste.com',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
    });

  });
});
