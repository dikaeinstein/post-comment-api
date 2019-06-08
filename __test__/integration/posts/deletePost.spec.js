import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import makeFakePost from '__test__/fixtures/post';

// Load config from the .env file (if exists)
dotenv.config();

const { app, postsDB, commentsDB } = require('src');


const apiPrefix = process.env.API_PREFIX;

/** @type {import('src/common/db').Connection} */
let db;

beforeAll(async () => {
  db = await postsDB;
});

afterAll(async () => {
  await db.dropDatabase();
  await db.close();
  await commentsDB.dropDatabase();
  await commentsDB.close();
});

afterEach(async () => {
  await db.model('Post').deleteMany({});
});

describe('post-comments-api', () => {
  describe('deleting post', () => {
    it('can delete post', async () => {
      const fakePost = makeFakePost();
      await db.model('Post').create(fakePost);

      const response = await request(app.callback())
        .delete(`${apiPrefix}/posts/${fakePost.id}`)
        .set({ 'Content-Type': 'application/json' });

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body.deleted.id).toEqual(fakePost.id);
    });
    it('returns an error if post is not found', async () => {
      const response = await request(app.callback())
        .delete(`${apiPrefix}/posts/nonExistingid`)
        .set({ 'Content-Type': 'application/json' });

      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.error.message).toEqual('Post not found.');
    });
  });
});
