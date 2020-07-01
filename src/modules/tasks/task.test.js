import request from 'supertest';
import app from '../../app.js';
import User from '../user/users.model.js';
import Task from './task.model.js';

const demoUser1 = {
  username: 'khoint',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  email: 'khoihhhhl@gmail.com',
};

const demoUser2 = {
  username: 'khoint1',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  email: 'khoihhhhl@gmail.com',
};

const demoUserLogin1 = {
  username: 'khoint',
  password: '123456789',
};

const demoUserLogin2 = {
  username: 'khoint1',
  password: '123456789',
};

const demoTask1 = {
  value: 'hello todo test 1',
};

const demoTask1Update = {
  value: 'test updated 1',
  isCompleted: true
};

const demoTask2 = {
  value: 'hello todo test 2',
};

let token1, token2, task1ID;

describe('user modules', () => {
  beforeAll(async () => { // eslint-disable-line
    await User.deleteMany({});
    await Task.deleteMany({});
  });

  test('should create user 1', async () => {
    const response = await request(app).post('/user/register').send(demoUser1);
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(demoUser1.username);
    expect(response.body.token).toHaveLength(176);
  });

  test('should create user 2', async () => {
    const response = await request(app).post('/user/register').send(demoUser2);
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(demoUser2.username);
    expect(response.body.token).toHaveLength(176);
  });

  test('should login user 1', async () => {
    const response = await request(app).post('/user/login').send(demoUserLogin1);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toHaveLength(176);
    token1 = response.body.token;
  });

  test('should login user 2', async () => {
    const response = await request(app).post('/user/login').send(demoUserLogin2);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toHaveLength(176);
    token2 = response.body.token;
  });

  test('should create task for user 1', async () => {
    const response = await request(app).post(`/task/`).set('Authorization', token1).send(demoTask1);
    expect(response.statusCode).toBe(201);
  });

  test('should create task for user 2', async () => {
    const response = await request(app).post(`/task/`).set('Authorization', token2).send(demoTask2);
    expect(response.statusCode).toBe(201);
  });

  test('should get task user 1', async () => {
    const response = await request(app).get(`/task/`).set('Authorization', token1);
    expect(response.statusCode).toBe(200);
    expect(response.body.total).toEqual(1);
    expect(response.body.tasks[0].value).toEqual(demoTask1.value);
    task1ID = response.body.tasks[0]._id
  });

  test('should get task user 2', async () => {
    const response = await request(app).get(`/task/`).set('Authorization', token2);
    expect(response.statusCode).toBe(200);
    expect(response.body.total).toEqual(1);
  });

  test('user 2 cannot update user 1 task', async () => {
    const response = await request(app).patch(`/task/${task1ID}`).set('Authorization', token2).send(demoTask1Update);
    expect(response.statusCode).toBe(404);
  });

  test('should update task 1', async () => {
    const response = await request(app).patch(`/task/${task1ID}`).set('Authorization', token1).send(demoTask1Update);
    const task = await Task.findOne({ _id: task1ID, isRemoved: false });
    expect(response.statusCode).toBe(200);
    expect(task.isCompleted).toBe(true);
    expect(task.value).toEqual(demoTask1Update.value);
  });

  test('should remove task 1', async () => {
    const response = await request(app).delete(`/task/${task1ID}`).set('Authorization', token1);
    expect(response.statusCode).toBe(200);
    const task = await Task.findOne({ _id: task1ID });
    expect(task.isRemoved).toBe(true);
  });

});
