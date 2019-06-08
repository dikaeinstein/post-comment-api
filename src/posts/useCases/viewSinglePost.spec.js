import assert from 'assert';

import { makeDocumentNotFoundError } from 'src/common/errors';
import makeFakeDB from '__test__/fixtures/db';
import makeFakePost from '__test__/fixtures/post';
import PostRepository from '../repository/post';
import makeViewSinglePost from './viewSinglePost';


/**
 * @type {PostRepository}
 */
let postRepository;
beforeAll(() => {
  const db = makeFakeDB();
  postRepository = new PostRepository({ db });
});

describe('viewSinglePost use case', () => {
  it('can retrieve a single post', async () => {
    const fakePost = makeFakePost();
    const insertedPost = await postRepository.insert(fakePost);

    const viewSinglePost = makeViewSinglePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    const post = await viewSinglePost(insertedPost.id);

    expect(post).toMatchObject(insertedPost);
  });
  it('handles non existent post', async () => {
    const fakePost = makeFakePost();
    const viewSinglePost = makeViewSinglePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    expect(viewSinglePost(fakePost.id)).rejects.toThrow('Post not found.');
  });
});
