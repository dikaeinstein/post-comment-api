import cases from 'jest-in-case';
import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import makeFakeComment from '__test__/fixtures/comment';
import makeFakePost from '__test__/fixtures/post';

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


const commentOnPostTestCases = [
  {
    name: 'requires comment to contain an author',
    input: { id: undefined, author: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Comment must have an author.',
    },
  },
  {
    name: 'requires comment to contain a valid author name',
    input: { id: undefined, author: 'a' },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: "Comment author's name must be longer than 2 characters.",
    },
  },
  {
    name: 'requires comment to contain text',
    input: { id: undefined, text: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Comment must include at least one character of text.',
    },
  },
];

const commentOnPostTestFn = async ({ input, errorResponse }) => {
  const fakeComment = makeFakeComment(input);

  const response = await request(app.callback())
    .post(`${apiPrefix}/comments`)
    .set({ 'Content-Type': 'application/json' })
    .send(fakeComment);

  expect(response.status).toEqual(errorResponse.status);
  expect(response.body.error.message).toInclude(errorResponse.message);
};

describe('post-comment-api', () => {
  cases('commenting on a post', commentOnPostTestFn, commentOnPostTestCases);
});

describe('post-comment-api', () => {
  describe('commenting on a post', () => {
    it('can add comment to a post', async () => {
      const fakePost = makeFakePost();
      const payload = {
        author: 'Dika',
        text: 'My first comment on a post.',
        postId: fakePost.id,
      };

      const response = await request(app.callback())
        .post(`${apiPrefix}/comments`)
        .set({ 'Content-Type': 'application/json' })
        .send(payload);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body.posted.author).toEqual(payload.author);
      expect(response.body.posted.text).toEqual(payload.text);
    });
  });
});
