import { Server } from 'http';
import supertest from 'supertest';
import {startServer, stopServer } from '../server';
import { UserModel } from '../models';
import GeoLib from '../lib';
const mongoose = require('mongoose');

describe('User API', () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let token: string;

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
          address: '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
        })
      )
      .set('Content-Type', 'application/json');
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await stopServer()
  });

  describe('POST /api/login', () => {
    it('should login the user', async () => {
      const response = await request
        .post('/api/login')
        .send(
          JSON.stringify({
            email: 'bruno@teste.com',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
    });
  });

  describe('POST /api/login', () => {
    it('should Error login the user', async () => {
      const response = await request
        .post('/api/login')
        .send(
          JSON.stringify({
            email: 'bruno@error.com',
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('GET /api/user', () => {
    it('should get logged user', async () => {
      const response = await request
        .get('/api/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  describe('PUT /api/user', () => {
    it('should update logged user', async () => {
      const response = await request
        .put('/api/user')
        .send(JSON.stringify({
          name: 'bruno',
          email: 'bruno@updated.com',
          address:
            '14840-000 - Vila Pacifico, Guariba - SP, 14840-000, Brazil',
        }))
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');


      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User updated');
    });
  });

  describe('DELETE /api/user', () => {
    it('should delete logged user', async () => {
      const response = await request
        .delete('/api/user')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200);
    });
  });
});
