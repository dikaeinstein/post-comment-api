import HttpStatus from 'http-status-codes';

import makeFakePost from '__test__/fixtures/post';
import makeDeletePost from './deletePost';


/** @typedef {import('common').Response} Response */

describe('deletePost controller', () => {
  it('successfully deletes a post', async () => {
    const post = makeFakePost();
    const removePostStub = () => Promise.resolve(post);
    const deletePost = makeDeletePost({ removePost: removePostStub });

    const response = /** @type {Response} */ (await deletePost({
      headers: { 'Content-Type': 'Application/json' },
      params: { id: post.id },
      ip: post.source.ip,
    }));
    expect(response.body.deleted).toMatchObject(post);
    expect(response.statusCode).toEqual(HttpStatus.OK);
  });
  it('catches error thrown', async () => {
    const post = makeFakePost();
    const removePostSaboteur = () => Promise.reject(new Error('Explode!'));
    const deletePost = makeDeletePost({ removePost: removePostSaboteur });
    try {
      await deletePost({
        headers: { 'Content-Type': 'Application/json' },
        params: { id: post.id },
        ip: post.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Explode!');
    }
  });
});
