import makeFakePost from '__test__/fixtures/post';
import { makeFakeModel } from '__test__/fixtures/db';
import makeAddPost from './addPost';
import PostRepository from '../repository/post';


/** @type {PostRepository} */
let postRepository;

beforeAll(() => {
  const model = makeFakeModel('Post');
  postRepository = new PostRepository({ model });
});

describe('addPost use case', () => {
  it('can save post', async () => {
    const post = makeFakePost();
    const addPost = makeAddPost({ postRepository });
    const inserted = await addPost(post);
    expect(inserted).toMatchObject(post);
  });
  it('is idempotent', async () => {
    const post = makeFakePost();
    const addPost = makeAddPost({ postRepository });
    const inserted1 = await addPost(post);
    const inserted2 = await addPost(post);
    expect(inserted1).toEqual(inserted2);
  });
});
