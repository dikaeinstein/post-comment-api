import makeFakeComment from '__test__/fixtures/comment';
import makeFakeDB from '__test__/fixtures/db';
import makeAddComment from './addComment';
import CommentRepository from '../repository/comment';


let commentRepository;
beforeAll(() => {
  const db = makeFakeDB();
  commentRepository = new CommentRepository({ db });
});

describe('addComment use case', () => {
  it('can save comment', async () => {
    const comment = makeFakeComment();
    const addComment = makeAddComment({ commentRepository });
    const inserted = await addComment(comment);
    expect(inserted).toMatchObject(comment);
  });
  it('is idempotent', async () => {
    const comment = makeFakeComment();
    const addComment = makeAddComment({ commentRepository });
    const inserted1 = await addComment(comment);
    const inserted2 = await addComment(comment);
    expect(inserted1).toEqual(inserted2);
  });
});
