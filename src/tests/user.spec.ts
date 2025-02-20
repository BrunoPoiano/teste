import { Server } from 'http';
import supertest from 'supertest';
import startServer from '../server';
import { UserModel } from '../models';
import GeoLib from '../lib';

describe('User API', () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    process.env.NODE_ENV = "test"
    server = await startServer();
    request = supertest(server);
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        resolve();
        process.env.NODE_ENV = "dev"
      });
    });
  });

  beforeEach(async () => {
  });

  describe('POST /api/signin', () => {
    it('should SignIn the user with address', async () => {
        const response = await request
          .post('/api/signin')
          .send(
            JSON.stringify({
              email: 'wewewe@example5.com',
              name: 'Bruno banana',
              address:
                '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
            })
          );

        expect(response.status).toBe(201);

    });
  });
});
