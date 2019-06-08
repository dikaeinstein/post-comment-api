import assert from 'assert';

import makeFakeDB from '__test__/fixtures/db';
import makeFakePost from '__test__/fixtures/post';
import { makeDocumentNotFoundError } from 'src/common/errors';
import md5 from 'src/common/utils/md5';
import makeRemovePost from './removePost';
import PostRepository from '../repository/post';


/** @type {PostRepository} */
let postRepository;

beforeAll(() => {
  const db = makeFakeDB();
  postRepository = new PostRepository({ db });
});

describe('removePost use case', () => {
  it('handles non existent post', async () => {
    const post = makeFakePost();
    const removePost = makeRemovePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    expect(removePost(post.id)).rejects.toThrow('Post not found.');
  });

  it('can remove post', async () => {
    const post = makeFakePost();

    const inserted = await postRepository.insert(post);

    const removePost = makeRemovePost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    const deletedPost = await removePost(inserted.id);
    expect(deletedPost.id).toEqual(inserted.id);
  });
});
