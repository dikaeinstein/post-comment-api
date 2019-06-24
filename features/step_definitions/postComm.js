/* eslint-disable func-names */
const assert = require('assert');

const { When, Then, AfterAll } = require('cucumber');
const HttpStatuses = require('http-status-codes');
const request = require('supertest');
require('dotenv').config();
const { app, postsDB, commentsDB } = require('src');


const apiPrefix = process.env.API_PREFIX;

AfterAll(async () => {
  await postsDB.dropDatabase();
  await commentsDB.dropDatabase();
  await commentsDB.close();
  await postsDB.close();
});

When('I send a GET request to api root endpoint', async function () {
  this.response = await request(app.callback())
    .get(`${apiPrefix}/`)
    .set({ 'Content-Type': 'application/json' });
});

Then('The response code should be 200', function () {
  assert.strictEqual(this.response.status, HttpStatuses.OK);
});

Then('The response should match json:', function (expected) {
  assert.equal(JSON.stringify(this.response.body, undefined, 2), expected);
});
