import postService from '../useCases';
import makeGetPosts from './getPosts';
import makePostPost from './postPost';
import makePatchPost from './patchPost';
import makeDeletePost from './deletePost';
import makeGetPost from './getPost';


const {
  addPost,
  editPost,
  listPosts,
  removePost,
  getSinglePost,
} = postService;

const deletePost = makeDeletePost({ removePost });
const getPost = makeGetPost({ getSinglePost });
const getPosts = makeGetPosts({ listPosts });
const postPost = makePostPost({ addPost });
const patchPost = makePatchPost({ editPost });


export default Object.freeze({
  deletePost, getPost, getPosts, postPost, patchPost,
});
