import cases from 'jest-in-case';
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
  await commentsDB.dropDatabase();
  await db.dropDatabase();
  await db.close();
  await commentsDB.close();
});

afterEach(async () => {
  await db.model('Post').deleteMany({});
});


const addPostTestCases = [
  {
    name: 'requires post to contain an author',
    input: { id: undefined, author: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Post must have an author.',
    },
  },
  {
    name: 'requires post to contain a valid author name',
    input: { id: undefined, author: 'a' },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: "Post author's name must be longer than 2 characters.",
    },
  },
  {
    name: 'requires post to contain text',
    input: { id: undefined, text: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Post must include at least one character of text.',
    },
  },
  {
    name: 'requires post to contain title',
    input: { id: undefined, title: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Post title must include at least one character of text.',
    },
  },
];

const addPostTestFn = async ({ input, errorResponse }) => {
  const fakePost = makeFakePost(input);

  const response = await request(app.callback())
    .post(`${apiPrefix}/posts`)
    .set({ 'Content-Type': 'application/json' })
    .send(fakePost);

  expect(response.status).toEqual(errorResponse.status);
  expect(response.body.error.message).toInclude(errorResponse.message);
};

describe('post-comment-api', () => {
  cases('adding posts', addPostTestFn, addPostTestCases);
});

describe('post-comment-api', () => {
  describe('adding posts', () => {
    it('can add post', async () => {
      const payload = {
        author: 'Dika',
        title: 'Test post',
        text: 'My first post on post comment',
      };

      const response = await request(app.callback())
        .post(`${apiPrefix}/posts`)
        .set({ 'Content-Type': 'application/json' })
        .send(payload);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body.posted.author).toEqual(payload.author);
      expect(response.body.posted.text).toEqual(payload.text);
      expect(response.body.posted.title).toEqual(payload.title);
    });
  });
});
