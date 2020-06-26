import request from 'supertest';

import app from '../../app.js';
import User from './users.model.js';

const demoUser = {
  username: 'khoint',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  email: 'khoihhhhl@gmail.com',
};

const demoUserLogin = {
  username: 'khoint',
  password: '123456789',
};

const demoUserUpdate = {
  password: '1234567890',
  fullname: 'Nguyen Truong Khoi',
  email: 'khoihhhhl@gmail.com',
};

let token;

describe('user modules', () => {
  beforeAll(async () => { // eslint-disable-line
    await User.deleteMany({});
  });

  test('should create user', async () => {
    const response = await request(app).post('/user/register').send(demoUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(demoUser.username);
    expect(response.body.token).toHaveLength(176);
  });

  test('should login', async () => {
    const response = await request(app).post('/user/login').send(demoUserLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toHaveLength(176);
    token = response.body.token;
  });

  test('should update user', async () => {
    const response = await request(app).patch(`/user/`).set('Authorization', token).send(demoUserUpdate);
    expect(response.statusCode).toBe(200);
    expect(response.body.fullname).toEqual(demoUserUpdate.fullname);
  });

  test('should remove user', async () => {
    const response = await request(app).delete(`/user/`).set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const user = await User.findOne({ username: demoUserLogin.username });
    expect(user.isRemoved).toBe(true);
  });
  
});
