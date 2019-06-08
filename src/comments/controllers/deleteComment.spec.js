import HttpStatus from 'http-status-codes';

import makeFakeComment from '__test__/fixtures/comment';
import makeDeleteComment from './deleteComment';


/** @typedef {import('.').Response} Response */

describe('deleteComment controller', () => {
  it('successfully deletes a comment', async () => {
    const comment = makeFakeComment();
    const removeComment = () => Promise.resolve(comment);
    const deleteComment = makeDeleteComment({ removeComment });

    const response = /** @type {Response} */ (await deleteComment({
      headers: { 'Content-Type': 'Application/json' },
      params: { id: comment.id },
      ip: comment.source.ip,
    }));
    expect(response.body.deleted).toMatchObject(comment);
    expect(response.statusCode).toEqual(HttpStatus.OK);
  });
  it('catches error thrown', async () => {
    const comment = makeFakeComment();
    const removeComment = () => Promise.reject(new Error('Explode!'));
    const deleteComment = makeDeleteComment({ removeComment });
    try {
      await deleteComment({
        headers: { 'Content-Type': 'Application/json' },
        params: { id: comment.id },
        ip: comment.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Explode!');
    }
  });
});
