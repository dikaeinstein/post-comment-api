import cases from 'jest-in-case';
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
  await db.dropDatabase();
  await postsDB.close();
  await db.close();
});

afterEach(async () => {
  await db.model('Comment').deleteMany({});
});

const modifyCommentTestCases = [
  {
    name: 'requires comment to contain text',
    input: { id: undefined, text: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'You must supply comment text.',
    },
  },
];

const modifyCommentTestFn = async ({ input, errorResponse }) => {
  const fakeComment = makeFakeComment();
  // Seed comment
  const newComment = await db.model('Comment').create(fakeComment);

  const commentPayload = makeFakeComment(input);

  const response = await request(app.callback())
    .patch(`${apiPrefix}/comments/${newComment.id}`)
    .set({ 'Content-Type': 'application/json' })
    .send(commentPayload);

  expect(response.status).toEqual(errorResponse.status);
  expect(response.body.error.message).toInclude(errorResponse.message);
};

describe('post-comment-api', () => {
  cases('modifying comments', modifyCommentTestFn, modifyCommentTestCases);
});

describe('post-comment-api', () => {
  describe('modifying comments', () => {
    it('can modify comment', async () => {
      const fakeComment = makeFakeComment();
      await db.model('Comment').create(fakeComment);

      const payload = { text: 'My modifiable comment.' };

      const response = await request(app.callback())
        .patch(`${apiPrefix}/comments/${fakeComment.id}`)
        .set({ 'Content-Type': 'application/json' })
        .send(payload);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body.patched.text).toEqual(payload.text);
    });
  });
});
