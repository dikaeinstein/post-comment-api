import HttpStatus from 'http-status-codes';

import makeFakePost from '__test__/fixtures/post';
import makeGetPost from './getPost';


/** @typedef {import('common').Response} Response */

describe('getPosts controller', () => {
  it('can retrieve all posts', async () => {
    const fakePost = makeFakePost();
    const getSinglePostStub = () => Promise
      .resolve(fakePost);
    const getPost = makeGetPost({ getSinglePost: getSinglePostStub });

    const response = /** @type {Response} */ (await getPost({
      headers: {
        'Content-Type': 'application/json',
        Referer: fakePost.source.referer,
        'User-Agent': fakePost.source.browser,
      },
      params: { id: fakePost.id },
      ip: fakePost.source.ip,
    }));
    expect(response.body.post).toEqual(fakePost);
    expect(response.statusCode).toEqual(HttpStatus.OK);
  });
  it('handles errors thrown while fetching post', async () => {
    const fakePost = makeFakePost();
    const getSinglePostSaboteur = () => Promise
      .reject(new Error('Error encountered while fetching post.'));

    try {
      const getPost = makeGetPost({ getSinglePost: getSinglePostSaboteur });

      await getPost({
        headers: {
          'Content-Type': 'application/json',
          Referer: fakePost.source.referer,
          'User-Agent': fakePost.source.browser,
        },
        params: { id: fakePost.id },
        ip: fakePost.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Error encountered while fetching post.');
    }
  });
});
