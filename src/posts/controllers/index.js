import {
  addPost,
  editPost,
  listPosts,
  removePost,
  viewSinglePost,
} from '../useCases';
import makeGetPosts from './getPosts';
import makePostPost from './postPost';
import makePatchPost from './patchPost';
import makeDeletePost from './deletePost';
import makeGetPost from './getPost';


/**
 * @typedef {object} Response
 * @property {object} headers
 * @property {number} statusCode
 * @property {object} [body]
 */

/**
 * @typedef {object} Request
 * @property {object} headers
 * @property {object} [query]
 * @property {object} [params]
 * @property {object} [body]
 * @property {string} ip
 */

const deletePost = makeDeletePost({ removePost });
const getPost = makeGetPost({ viewSinglePost });
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
