import HttpStatus from 'http-status-codes';

import makeFakeComment from '__test__/fixtures/comment';
import makePostComment from './postComment';


/** @typedef {import('common').Response} Response */

describe('postComment controller', () => {
  it('successfully posts a comment', async () => {
    const comment = makeFakeComment();
    const addComment = (commentInfo) => Promise.resolve(commentInfo);
    const postComment = makePostComment({ addComment });
    const response = /** @type {Response} */ (await postComment({
      headers: {
        'Content-Type': 'application/json',
        Referer: comment.source.referer,
        'User-Agent': comment.source.browser,
      },
      body: comment,
      ip: comment.source.ip,
    }));
    expect(response.body.posted).toMatchObject(comment);
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
  });
  it('handles errors throw while posting comment', async () => {
    const comment = makeFakeComment();
    const addComment = () => Promise.reject(new Error('Explode!'));
    const postComment = makePostComment({ addComment });
    try {
      await postComment({
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': comment.source.browser,
        },
        body: comment,
        ip: comment.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Explode!');
    }
  });
});
