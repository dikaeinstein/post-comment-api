import dotenv from 'dotenv';
import HttpStatuses from 'http-status-codes';
import request from 'supertest';

// Load config from the .env file (if exists)
dotenv.config();

const { app, postsDB, commentsDB } = require('src');


const apiPrefix = process.env.API_PREFIX;

afterAll(async () => {
  await postsDB.dropDatabase();
  await commentsDB.dropDatabase();
  await commentsDB.close();
  await postsDB.close();
});

describe('post-comment-api', () => {
  it('returns a welcome message', async () => {
    const response = await request(app.callback())
      .get(`${apiPrefix}/`)
      .set({ 'Content-Type': 'application/json' });

    expect(response.status).toEqual(HttpStatuses.OK);
    expect(response.body.message).toEqual('Welcome to post-comment-api.');
  });
});
