import {
  addPost,
  editPost,
  listPosts,
  removePost,
  getSinglePost,
} from '../useCases';
import makeGetPosts from './getPosts';
import makePostPost from './postPost';
import makePatchPost from './patchPost';
import makeDeletePost from './deletePost';
import makeGetPost from './getPost';


const deletePost = makeDeletePost({ removePost });
const getPost = makeGetPost({ getSinglePost });
const getPosts = makeGetPosts({ listPosts });
const postPost = makePostPost({ addPost });
const patchPost = makePatchPost({ editPost });

const postControllers = Object.freeze({
  deletePost, getPost, getPosts, postPost, patchPost,
});

export default postControllers;
export {
  deletePost, getPost, getPosts, postPost, patchPost,
};
