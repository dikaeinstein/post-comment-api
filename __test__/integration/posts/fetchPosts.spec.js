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

const fetchPostsTestCases = [
  {
    name: 'can fetch posts',
    seedData: true,
    result: {
      statusCode: HttpStatus.OK,
      postsLength: 3,
    },
  },
  {
    name: 'returns an empty array if no posts exists',
    seedData: false,
    result: {
      statusCode: HttpStatus.OK,
      postsLength: 0,
    },
  },
];

const fetchPostsTestFn = async ({ seedData, result }) => {
  if (seedData) {
    const fakePost1 = makeFakePost();
    const fakePost2 = makeFakePost();
    const fakePost3 = makeFakePost();
    // Seed fake posts
    await db.model('Post')
      .insertMany([fakePost1, fakePost2, fakePost3]);
  }

  const response = await request(app.callback())
    .get(`${apiPrefix}/posts`)
    .set({ 'Content-Type': 'application/json' });

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.posts.length).toEqual(result.postsLength);
};

describe('post-comment-api', () => {
  cases('fetching posts', fetchPostsTestFn, fetchPostsTestCases);
});
