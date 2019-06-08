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

const modifyPostTestCases = [
  {
    name: 'requires post to contain text',
    input: { id: undefined, text: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'You must supply post text.',
    },
  },
  {
    name: 'requires post to contain title',
    input: { id: undefined, title: undefined },
    errorResponse: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'You must supply post title.',
    },
  },
];

const modifyPostTestFn = async ({ input, errorResponse }) => {
  const fakePost = makeFakePost();
  // Seed post
  await db.model('Post').create(fakePost);

  const postPayload = makeFakePost(input);

  const response = await request(app.callback())
    .patch(`${apiPrefix}/posts/${fakePost.id}`)
    .set({ 'Content-Type': 'application/json' })
    .send(postPayload);

  expect(response.status).toEqual(errorResponse.status);
  expect(response.body.error.message).toInclude(errorResponse.message);
};

describe('post-comment-api', () => {
  cases('modifying posts', modifyPostTestFn, modifyPostTestCases);
});

describe('post-comment-api', () => {
  describe('modifying posts', () => {
    it('can modify post', async () => {
      const fakePost = makeFakePost();
      await db.model('Post').create(fakePost);

      const payload = {
        title: 'Test post',
        text: 'My modifiable post.',
      };

      const response = await request(app.callback())
        .patch(`${apiPrefix}/posts/${fakePost.id}`)
        .set({ 'Content-Type': 'application/json' })
        .send(payload);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body.patched.text).toEqual(payload.text);
      expect(response.body.patched.title).toEqual(payload.title);
    });
    it('returns an error if post is not found', async () => {
      const payload = {
        title: 'Test post',
        text: 'My modifiable post.',
      };

      const response = await request(app.callback())
        .patch(`${apiPrefix}/posts/nonExistingid`)
        .set({ 'Content-Type': 'application/json' })
        .send(payload);

      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
      expect(response.body.error.message).toEqual('Post not found.');
    });
  });
});
