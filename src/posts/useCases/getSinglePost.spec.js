import assert from 'assert';

import { makeDocumentNotFoundError } from 'src/common/errors';
import { makeFakeModel } from '__test__/fixtures/db';
import makeFakePost from '__test__/fixtures/post';
import PostRepository from '../repository/post';
import makeGetSinglePost from './getSinglePost';


/**
 * @type {PostRepository}
 */
let postRepository;
beforeAll(() => {
  const model = makeFakeModel('Post');
  postRepository = new PostRepository({ model });
});

describe('viewSinglePost use case', () => {
  it('can retrieve a single post', async () => {
    const fakePost = makeFakePost();
    const insertedPost = /** @type {import('post').Post} */ (await postRepository
      .insert(fakePost));

    const getSinglePost = makeGetSinglePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    const post = await getSinglePost(insertedPost.id);

    expect(post).toMatchObject(insertedPost);
  });
  it('handles non existent post', async () => {
    const fakePost = makeFakePost();
    const viewSinglePost = makeGetSinglePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    expect(viewSinglePost(fakePost.id)).rejects.toThrow('Post not found.');
  });
});
