import assert from 'assert';

import cases from 'jest-in-case';

import { makeDocumentNotFoundError } from 'src/common/errors';
import { makeFakeModel } from '__test__/fixtures/db';
import makeFakeComment from '__test__/fixtures/comment';
import makeRemoveComment from './removeComment';
import CommentRepository from '../repository/comment';


/** @type {CommentRepository} */
let commentRepository;

beforeAll(() => {
  const model = makeFakeModel('Comment');
  commentRepository = new CommentRepository({ model });
});

const removeCommentTestCases = [
  {
    name: 'must include commentId',
    input: { id: undefined },
    wantErrMessage: 'You must supply a comment id.',
  },
  {
    name: 'handles non existent comment',
    input: {},
    wantErrMessage: 'Comment not found.',
  },
];

const removeCommentTestFunction = async ({ input, wantErrMessage }) => {
  const comment = makeFakeComment(input);
  const removeComment = makeRemoveComment({
    commentRepository, assert, makeDocumentNotFoundError,
  });
  expect(removeComment(comment.id)).rejects.toThrow(wantErrMessage);
};

cases('removeComment use case',
  removeCommentTestFunction, removeCommentTestCases);

describe('removeComment use case', () => {
  it('can remove comment', async () => {
    const comment = makeFakeComment();
    const inserted = /** @type {import('comment').Comment} */ (await commentRepository
      .insert(comment));

    const removeComment = makeRemoveComment({
      commentRepository, assert, makeDocumentNotFoundError,
    });
    const deletedComment = await removeComment(inserted.id);

    expect(deletedComment.id).toEqual(inserted.id);
  });
});
