import assert from 'assert';

import cases from 'jest-in-case';

import { makeFakeModel } from '__test__/fixtures/db';
import makeFakePost from '__test__/fixtures/post';
import { makeDocumentNotFoundError } from 'src/common/errors';
import makeEditPost from './editPost';
import PostRepository from '../repository/post';


/** @type {PostRepository} */
let postRepository;

beforeAll(() => {
  const model = makeFakeModel('Post');
  postRepository = new PostRepository({ model });
});

const editPostValidationTestCases = [
  {
    name: 'must include an id',
    input: { id: undefined },
    wantErrMessage: 'You must supply post id.',
  },
  {
    name: 'must include a title',
    input: { title: undefined },
    wantErrMessage: 'You must supply post title.',
  },
  {
    name: 'must include a text',
    input: { text: undefined },
    wantErrMessage: 'You must supply post text.',
  },
  {
    name: 'handles not existent post',
    input: {},
    wantErrMessage: 'Post not found.',
  },
];

const editPostValidationTestFunction = async ({ input, wantErrMessage }) => {
  const post = makeFakePost(input);
  const editPost = makeEditPost({
    postRepository, assert, makeDocumentNotFoundError,
  });
  expect(editPost(post)).rejects.toThrow(wantErrMessage);
};

cases('editPost use case',
  editPostValidationTestFunction, editPostValidationTestCases);

describe('editPost use case', () => {
  it('does not modify an existing post without new change', async () => {
    const post = makeFakePost();

    await postRepository.insert(post);

    const editPost = makeEditPost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    const updatedPost = await editPost(post);

    expect(updatedPost.text).toEqual(post.text);
    expect(updatedPost.modifiedOn).toEqual(post.modifiedOn);
    expect(updatedPost.hash).toEqual(post.hash);
  });
  it('modifies an existing post', async () => {
    const post = makeFakePost();

    await postRepository.insert(post);

    const editPost = makeEditPost({
      postRepository, assert, makeDocumentNotFoundError,
    });
    const updatedPost = await editPost({ ...post, text: 'updated post' });

    expect(updatedPost.text).toEqual('updated post');
    expect(updatedPost.hash).not.toEqual(post.hash);
  });
});
