import HttpStatus from 'http-status-codes';

import makeFakeComment from '__test__/fixtures/comment';
import makePatchComment from './patchComment';


describe('patchComment Controller', () => {
  it('successfully patches a comment', async () => {
    const fakeComment = makeFakeComment();
    const editCommentStub = c => Promise.resolve(c);
    const patchComment = makePatchComment({ editComment: editCommentStub });
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: fakeComment.source.referer,
        'User-Agent': fakeComment.source.browser,
      },
      params: {
        id: fakeComment.id,
      },
      body: fakeComment,
      ip: fakeComment.source.ip,
    };
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(fakeComment.modifiedOn).toUTCString(),
      },
      statusCode: HttpStatus.OK,
      body: { patched: request.body },
    };
    const actual = await patchComment(request);
    expect(actual).toEqual(expected);
  });
  it('handles error thrown while patching a comment', async () => {
    const fakeComment = makeFakeComment();
    const editCommentSaboteur = () => Promise.reject(new Error('Blow!'));
    const patchComment = makePatchComment({ editComment: editCommentSaboteur });
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': fakeComment.source.browser,
      },
      params: {
        id: fakeComment.id,
      },
      body: fakeComment,
      ip: fakeComment.source.ip,
    };
    try {
      await patchComment(request);
    } catch (error) {
      expect(error.message).toEqual('Blow!');
    }
  });
});
