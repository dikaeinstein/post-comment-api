import makePost from '../post';


/**
 * Factory function to create the addPost function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @returns {import('post').addPost}
 */
const makeAddPost = ({ postRepository }) => async (postInfo) => {
  const post = makePost(postInfo);

  const existing = await postRepository.findByHash(post.getHash());

  if (existing) {
    return existing;
  }

  const source = post.getSource();

  return /** @type {Promise<import('post').Post>} */ (postRepository
    .insert({
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
    }));
};

export default makeAddPost;
