/* eslint-disable no-unused-vars */
import { makeFakeModel } from '__test__/fixtures/db';
import makeFakeComment from '__test__/fixtures/comment';
import CommentRepository from './comment';
import commentSchema from '../model/commentSchema';


/** @type {CommentRepository} */
let commentRepository;

beforeAll(() => {
  const model = makeFakeModel('Comment');
  commentRepository = new CommentRepository({ model });
});

describe('CommentRepository', () => {
  it('lists comments', async () => {
    const comment1 = makeFakeComment();
    const comment2 = makeFakeComment();
    const comment3 = makeFakeComment();

    await commentRepository.insert([comment1, comment2, comment3]);

    const comments = await commentRepository.findAll({});
    expect(comments).toEqual([comment1, comment2, comment3]);
  });

  it('inserts a comment', async () => {
    const comment = makeFakeComment();
    const result = await commentRepository.insert(comment);
    return expect(result).toEqual(comment);
  });

  it('finds a comment by id', async () => {
    const comment = makeFakeComment();
    await commentRepository.insert(comment);
    const found = await commentRepository.findById(comment.id);
    expect(found).toEqual(comment);
  });

  it("finds a comment by it's hash", async () => {
    const fakeCommentOne = makeFakeComment();
    const fakeCommentTwo = makeFakeComment();
    const insertedOne = await commentRepository.insert(fakeCommentOne);
    const insertedTwo = await commentRepository.insert(fakeCommentTwo);

    expect(await commentRepository.findByHash(fakeCommentOne.hash))
      .toEqual(insertedOne);
    expect(await commentRepository.findByHash(fakeCommentTwo.hash))
      .toEqual(insertedTwo);
  });

  it('updates a comment', async () => {
    const comment = makeFakeComment();
    await commentRepository.insert(comment);
    comment.text = 'changed';
    const updated = await commentRepository.update({ id: comment.id },
      comment);
    return expect(updated.text).toEqual('changed');
  });

  it('finds all comments for a post', async () => {
    const commentOnPostA = makeFakeComment();
    const commentOnPostB = makeFakeComment({ postId: commentOnPostA.postId });

    await commentRepository.insert([commentOnPostA, commentOnPostB]);

    const comments = await commentRepository
      .findByPostId(commentOnPostA.postId);

    expect(comments).toEqual([commentOnPostA, commentOnPostB]);
  });

  it('deletes a comment', async () => {
    const comment = makeFakeComment();
    await commentRepository.insert(comment);
    const deletedComment = await commentRepository.remove({ id: comment.id });
    expect(deletedComment.id).toEqual(comment.id);
  });
});
