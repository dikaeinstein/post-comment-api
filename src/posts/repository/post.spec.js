/* eslint-disable no-unused-vars */
import { makeFakeModel } from '__test__/fixtures/db';
import md5 from 'src/common/utils/md5';
import makeFakePost from '__test__/fixtures/post';
import PostRepository from './post';
import postSchema from '../model/postSchema';


/** @type {PostRepository} */
let postRepository;

beforeAll(() => {
  const model = makeFakeModel('Post');
  postRepository = new PostRepository({ model });
});

describe('PostRepository', () => {
  it('lists posts', async () => {
    const post1 = makeFakePost();
    const post2 = makeFakePost();
    const post3 = makeFakePost();

    await postRepository.insert([post1, post2, post3]);

    const posts = await postRepository.findAll({});
    expect(posts).toEqual([post1, post2, post3]);
  });

  it('inserts a post', async () => {
    const post = makeFakePost();
    const result = await postRepository.insert(post);
    return expect(result).toEqual(post);
  });

  it('finds a post by id', async () => {
    const post = makeFakePost();
    await postRepository.insert(post);
    const found = await postRepository.findById(post.id);
    expect(found).toEqual(post);
  });

  it("finds a post by it's hash", async () => {
    const fakePostOne = makeFakePost();
    fakePostOne.hash = md5(fakePostOne.author
      + fakePostOne.id + fakePostOne.text + fakePostOne.title);
    const fakePostTwo = makeFakePost();
    fakePostTwo.hash = md5(fakePostTwo.author
      + fakePostTwo.id + fakePostTwo.text + fakePostTwo.title);
    const insertedOne = await postRepository.insert(fakePostOne);
    const insertedTwo = await postRepository.insert(fakePostTwo);

    expect(await postRepository.findByHash(fakePostOne.hash))
      .toEqual(insertedOne);
    expect(await postRepository.findByHash(fakePostTwo.hash))
      .toEqual(insertedTwo);
  });

  it('updates a post', async () => {
    const post = makeFakePost();
    await postRepository.insert(post);
    post.text = 'changed';
    const updated = await postRepository.update({ id: post.id }, post);
    return expect(updated.text).toEqual('changed');
  });

  it('deletes a post', async () => {
    const post = makeFakePost();
    await postRepository.insert(post);
    const deletedPost = await postRepository.remove({ id: post.id });
    expect(deletedPost.id).toEqual(post.id);
  });
});
