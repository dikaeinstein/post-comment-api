import assert from 'assert';

import { makeDocumentNotFoundError } from 'src/common/errors';
import makeAddPost from './addPost';
import makeEditPost from './editPost';
import makeListPosts from './listPosts';
import makeRemovePost from './removePost';
import makeViewSinglePost from './viewSinglePost';
import postRepository from '../repository';


const addPost = makeAddPost({ postRepository });
const editPost = makeEditPost({
  postRepository, assert, makeDocumentNotFoundError,
});
const listPosts = makeListPosts({ postRepository });
const removePost = makeRemovePost({
  postRepository, assert, makeDocumentNotFoundError,
});
const viewSinglePost = makeViewSinglePost({
  postRepository, assert, makeDocumentNotFoundError,
});

const postService = Object.freeze({
  addPost,
  editPost,
  listPosts,
  removePost,
  viewSinglePost,
});

export default postService;
export {
  addPost, editPost, listPosts, removePost, viewSinglePost,
};
