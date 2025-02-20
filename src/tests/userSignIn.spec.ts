import { Server } from 'http';
import supertest from 'supertest';
import { startServer, stopServer } from '../server';
import { UserModel } from '../models';
import GeoLib from '../lib';

describe('User API', () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    server = await startServer();
      request = supertest(server);
  });

  afterAll(async () => {
    await stopServer();
  });

  describe('POST /api/signin', () => {
    it('should SignIn the user', async () => {
      const response = await request
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

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
    });

    it('should error SignIn the user the same email', async () => {
      const response = await request
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

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should error SignIn the user without name', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            email: 'bruno1@teste.com',
            address:
              '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should error SignIn the user without email', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            name: 'Bruno',
            address:
              '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should error SignIn the user without address and coordinates', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            email: 'bruno2@teste.com',
            name: 'Bruno 2',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should error SignIn the user with both address and coordinates', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            email: 'bruno3@teste.com',
            name: 'Bruno 3',
            address:
              '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
            coordinates: [-48.2281579, -21.3570556],
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
    });

    it('should SignIn the user with only address', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            email: 'bruno4@teste.com',
            name: 'Bruno 4',
            address:
              '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
    });

    it('should SignIn the user with only coordinates', async () => {
      const response = await request
        .post('/api/signin')
        .send(
          JSON.stringify({
            email: 'bruno5@teste.com',
            name: 'Bruno 5',
            coordinates: [-48.2281579, -21.3570556],
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
    });
  });
});
