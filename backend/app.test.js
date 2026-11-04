const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app } = require('./app');

test('GET /tasks returns all tasks', async () => {
  const response = await request(app).get('/tasks');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test('POST /tasks creates a new task', async () => {
  const payload = { title: 'Write README', description: 'Document the API', completed: false };

  const response = await request(app).post('/tasks').send(payload);

  assert.equal(response.status, 201);
  assert.equal(response.body.title, payload.title);
  assert.equal(response.body.description, payload.description);
  assert.equal(response.body.completed, false);
  assert.ok(response.body.id);
});
