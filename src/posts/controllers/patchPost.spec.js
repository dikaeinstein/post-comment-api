import HttpStatus from 'http-status-codes';

import makeFakePost from '__test__/fixtures/post';
import makePatchPost from './patchPost';


describe('patchPost Controller', () => {
  it('successfully patches a post', async () => {
    const fakePost = makeFakePost();
    const editPostStub = p => Promise.resolve(p);
    const patchPost = makePatchPost({ editPost: editPostStub });
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: fakePost.source.referer,
        'User-Agent': fakePost.source.browser,
      },
      params: { id: fakePost.id },
      body: fakePost,
      ip: fakePost.source.ip,
    };
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(fakePost.modifiedOn).toUTCString(),
      },
      statusCode: HttpStatus.OK,
      body: { patched: request.body },
    };
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });
  it('handles error thrown while patching a post', async () => {
    const fakePost = makeFakePost();
    const editPost = () => Promise.reject(new Error('Blow!'));
    const patchPost = makePatchPost({ editPost });
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': fakePost.source.browser,
      },
      params: { id: fakePost.id },
      body: fakePost,
      ip: fakePost.source.ip,
    };
    try {
      await patchPost(request);
    } catch (error) {
      expect(error.message).toEqual('Blow!');
    }
  });
});
