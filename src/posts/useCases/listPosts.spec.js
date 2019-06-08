import makeFakeDB from '__test__/fixtures/db';
import makeFakePost from '__test__/fixtures/post';
import PostRepository from '../repository/post';
import makeListPosts from './listPosts';


/**
 * @type {PostRepository}
 */
let postRepository;
beforeAll(() => {
  const db = makeFakeDB();
  postRepository = new PostRepository({ db });
});

describe('listPost use case', () => {
  it('can get all posts', async () => {
    const post1 = makeFakePost();
    const post2 = makeFakePost();
    await postRepository.insert([post1, post2]);

    const listPosts = makeListPosts({ postRepository });
    const posts = await listPosts();

    expect(posts).toBeArray();
    expect(posts).toEqual([post1, post2]);
  });
});
