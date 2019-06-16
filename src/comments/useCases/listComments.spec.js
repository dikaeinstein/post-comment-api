import assert from 'assert';

import makeFakeComment from '__test__/fixtures/comment';
import { makeFakeModel } from '__test__/fixtures/db';
import CommentRepository from '../repository/comment';
import makeListComments from './listComments';


/**
 * @type {CommentRepository}
 */
let commentRepository;
beforeAll(() => {
  const model = makeFakeModel('Comment');
  commentRepository = new CommentRepository({ model });
});

describe('listComment use case', () => {
  it('requires a postId', async () => {
    const listComments = makeListComments({ commentRepository, assert });
    expect(listComments()).rejects.toThrow('You must supply postId.');
  });
  it('can get all comments for a single post', async () => {
    const comment1 = makeFakeComment();
    const comment2 = makeFakeComment({ postId: comment1.postId });
    await commentRepository.insert([comment1, comment2]);

    const listComments = makeListComments({ commentRepository, assert });
    const comments = await listComments(comment1.postId);

    expect(comments).toBeArray();
    expect(comments).toEqual([comment1, comment2]);
  });
});
