import assert from 'assert';

import cases from 'jest-in-case';

import { makeFakeModel } from '__test__/fixtures/db';
import makeFakeComment from '__test__/fixtures/comment';
import { makeDocumentNotFoundError } from 'src/common/errors';
import makeEditComment from './editComment';
import CommentRepository from '../repository/comment';


/** @type {CommentRepository} */
let commentRepository;

beforeAll(() => {
  const model = makeFakeModel('Comment');
  commentRepository = new CommentRepository({ model });
});

const editCommentValidationTestCases = [
  {
    name: 'must include an id',
    input: { id: undefined },
    wantErrMessage: 'You must supply a comment id.',
  },
  {
    name: 'must include a text',
    input: { text: undefined },
    wantErrMessage: 'You must supply comment text.',
  },
  {
    name: 'handles not existent comment',
    input: {},
    wantErrMessage: 'Comment not found.',
  },
];

const editCommentValidationTestFunction = async ({ input, wantErrMessage }) => {
  const comment = makeFakeComment(input);
  const editComment = makeEditComment({
    commentRepository, assert, makeDocumentNotFoundError,
  });
  expect(editComment(comment)).rejects.toThrow(wantErrMessage);
};

cases('editComment use case',
  editCommentValidationTestFunction, editCommentValidationTestCases);

describe('editComment use case', () => {
  it('does not modify an existing comment without new change', async () => {
    const comment = makeFakeComment();

    await commentRepository.insert(comment);

    const editComment = makeEditComment({
      commentRepository, assert, makeDocumentNotFoundError,
    });
    const updatedComment = await editComment(comment);

    expect(updatedComment.text).toEqual(comment.text);
    expect(updatedComment.modifiedOn).toEqual(comment.modifiedOn);
    expect(updatedComment.hash).toEqual(comment.hash);
  });
  it('modifies an existing comment', async () => {
    const comment = makeFakeComment();

    await commentRepository.insert(comment);

    const editComment = makeEditComment({
      commentRepository, assert, makeDocumentNotFoundError,
    });
    const updatedComment = await editComment({ ...comment, text: 'updated comment' });

    expect(updatedComment.text).toEqual('updated comment');
    expect(updatedComment.hash).not.toEqual(comment.hash);
  });
});
