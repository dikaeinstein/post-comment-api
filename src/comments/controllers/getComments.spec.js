import HttpStatus from 'http-status-codes';

import makeFakeComment from '__test__/fixtures/comment';
import makeGetComments from './getComments';


/** @typedef {import('common').Response} Response */

describe('getComments controller', () => {
  it('can retrieve all comments', async () => {
    const fakeComment1 = makeFakeComment();
    const fakeComment2 = makeFakeComment({ postId: fakeComment1.postId });
    const listCommentsStub = () => Promise
      .resolve([fakeComment1, fakeComment2]);
    const getComments = makeGetComments({ listComments: listCommentsStub });

    const response = /** @type {Response} */ (await getComments({
      headers: {
        'Content-Type': 'application/json',
        Referer: fakeComment1.source.referer,
        'User-Agent': fakeComment1.source.browser,
      },
      query: {
        postId: fakeComment1.id,
      },
      ip: fakeComment1.source.ip,
    }));

    expect(response.body.comments).toEqual([fakeComment1, fakeComment2]);
    expect(response.statusCode).toEqual(HttpStatus.OK);
  });
  it('handles errors thrown while fetching comments', async () => {
    const fakeComment1 = makeFakeComment();
    const listCommentsSaboteur = () => Promise
      .reject(new Error('Error fetching comments.'));

    try {
      const getComments = makeGetComments({
        listComments: listCommentsSaboteur,
      });

      await getComments({
        headers: {
          'Content-Type': 'application/json',
          Referer: fakeComment1.source.referer,
          'User-Agent': fakeComment1.source.browser,
        },
        query: {
          postId: fakeComment1.id,
        },
        ip: fakeComment1.source.ip,
      });
    } catch (error) {
      expect(error.message).toEqual('Error fetching comments.');
    }
  });
});
