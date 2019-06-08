import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import makeFakeComment from '__test__/fixtures/comment';

// Load config from the .env file (if exists)
dotenv.config();

const { app, postsDB, commentsDB } = require('src');


const apiPrefix = process.env.API_PREFIX;

/** @type {import('src/common/db').Connection} */
let db;

beforeAll(async () => {
  db = await commentsDB;
});

afterAll(async () => {
  await postsDB.dropDatabase();
  await postsDB.close();
  await db.dropDatabase();
  await db.close();
});

afterEach(async () => {
  await db.model('Comment').deleteMany({});
});

describe('post-comments-api', () => {
  describe('deleting comment', () => {
    it('can delete comment', async () => {
      const fakeComment = makeFakeComment();
      await db.model('Comment').create(fakeComment);

      const response = await request(app.callback())
        .delete(`${apiPrefix}/comments/${fakeComment.id}`)
        .set({ 'Content-Type': 'application/json' });

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body.deleted.id).toEqual(fakeComment.id);
    });
    it('returns an error if comment is not found', async () => {
      const response = await request(app.callback())
        .delete(`${apiPrefix}/comments/nonExistingid`)
        .set({ 'Content-Type': 'application/json' });

      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.error.message).toEqual('Comment not found.');
    });
  });
});
