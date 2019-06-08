import HttpStatus from 'http-status-codes';

import makeFakePost from '__test__/fixtures/post';
import makePostPost from './postPost';


/** @typedef {import('./getPosts').Response} Response */

describe('postPost controller', () => {
  it('successfully posts a post', async () => {
    const post = makeFakePost();
    const addPost = postInfo => Promise.resolve(postInfo);
    const postPost = makePostPost({ addPost });
    const response = /** @type {Response} */ (await postPost({
      headers: {
        'Content-Type': 'application/json',
        Referer: post.source.referer,
        'User-Agent': post.source.browser,
      },
      body: post,
      ip: post.source.ip,
    }));
    expect(response.body.posted).toMatchObject(post);
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
  });
  it('handles errors throw while posting post', async () => {
    const post = makeFakePost();
    const addPost = () => Promise.reject(new Error('Explode!'));
    const postPost = makePostPost({ addPost });
    try {
      await postPost({
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': post.source.browser,
        },
        body: post,
        ip: post.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Explode!');
    }
  });
});
