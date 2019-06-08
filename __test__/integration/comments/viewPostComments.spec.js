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
  await db.close();
  await postsDB.close();
});

afterEach(async () => {
  await db.model('Comment').deleteMany({});
});

const fetchCommentsTestCases = [
  {
    name: 'can fetch comments',
    seedData: true,
    fakeComment: makeFakeComment(),
    result: {
      statusCode: HttpStatus.OK,
      commentsLength: 3,
    },
  },
  {
    name: 'returns an empty array if no comments exists',
    seedData: false,
    fakeComment: makeFakeComment(),
    result: {
      statusCode: HttpStatus.OK,
      commentsLength: 0,
    },
  },
];

const fetchCommentsTestFn = async ({ fakeComment, seedData, result }) => {
  if (seedData) {
    const fakeComment2 = makeFakeComment({ postId: fakeComment.postId });
    const fakeComment3 = makeFakeComment({ postId: fakeComment.postId });
    // Seed fake comments
    await db.model('Comment')
      .insertMany([fakeComment, fakeComment2, fakeComment3]);
  }

  const response = await request(app.callback())
    .get(`${apiPrefix}/comments?postId=${fakeComment.postId}`)
    .set({ 'Content-Type': 'application/json' });

  expect(response.status).toEqual(result.statusCode);
  expect(response.body.comments.length).toEqual(result.commentsLength);
};

describe('comment-comment-api', () => {
  cases('fetching comments', fetchCommentsTestFn, fetchCommentsTestCases);
});
