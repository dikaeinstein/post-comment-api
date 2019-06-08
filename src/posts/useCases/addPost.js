import makePost from '../post';


/**
 * @typedef {import('../post/post').Post} Post
 */

/**
 * @callback AddPost
 * @param {Post} postInfo
 * @returns {Promise<Post & { hash: string }>}
 */

/**
 * Factory function to create the addComment function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @returns {AddPost}
 */
const makeAddPost = ({ postRepository }) => async (postInfo) => {
  const post = makePost(postInfo);

  const existing = await postRepository.findByHash(post.getHash());

  if (existing) {
    return existing;
  }

  const source = post.getSource();

  return postRepository.insert({
    author: post.getAuthor(),
    createdOn: post.getCreatedOn(),
    hash: post.getHash(),
    id: post.getId(),
    modifiedOn: post.getModifiedOn(),
    source: {
      browser: source.getBrowser(),
      ip: source.getIp(),
      referer: source.getReferer(),
    },
    text: post.getText(),
    title: post.getTitle(),
  });
};

export default makeAddPost;
