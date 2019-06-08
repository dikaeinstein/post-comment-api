import HttpStatus from 'http-status-codes';

import makeFakePost from '__test__/fixtures/post';
import makeGetPosts from './getPosts';


/** @typedef {import('../controllers').Response} Response */

describe('getPosts controller', () => {
  it('can retrieve all posts', async () => {
    const fakePost1 = makeFakePost();
    const fakePost2 = makeFakePost();
    const listPosts = () => Promise
      .resolve([fakePost1, fakePost2]);
    const getPosts = makeGetPosts({ listPosts });

    const response = /** @type {Response} */ (await getPosts({
      headers: {
        'Content-Type': 'application/json',
        Referer: fakePost1.source.referer,
        'User-Agent': fakePost1.source.browser,
      },
      ip: fakePost1.source.ip,
    }));
    expect(response.body.posts).toEqual([fakePost1, fakePost2]);
    expect(response.statusCode).toEqual(HttpStatus.OK);
  });
  it('handles errors thrown while fetching posts', async () => {
    const fakePost1 = makeFakePost();
    const listPosts = () => Promise
      .reject(new Error('Error fetching posts.'));

    try {
      const getPosts = makeGetPosts({ listPosts });

      await getPosts({
        headers: {
          'Content-Type': 'application/json',
          Referer: fakePost1.source.referer,
          'User-Agent': fakePost1.source.browser,
        },
        ip: fakePost1.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Error fetching posts.');
    }
  });
});
