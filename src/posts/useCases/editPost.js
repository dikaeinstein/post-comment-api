import makePost from '../post';


/**
 * @typedef {import('../post/post').Post} Post
 */

/**
 * @callback EditPost
 * @param {Post} postInfo
 * @returns {Promise<Post & { hash: string }>}
 */

/**
 * Factory function to create the editPost function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @param {Function} params.assert
 * @param {(message: string) => Error} params.makeDocumentNotFoundError
 * @returns {EditPost}
 */
const makeEditPost = ({
  postRepository, assert, makeDocumentNotFoundError,
}) => async (postInfo) => {
  const { id, ...changes } = postInfo;
  assert(id, 'You must supply post id.');
  assert(changes.title, 'You must supply post title.');
  assert(changes.text, 'You must supply post text.');

  const existing = await postRepository.findById(id, null, { lean: true });

  if (!existing) {
    throw makeDocumentNotFoundError('Post not found.');
  }

  const post = makePost({
    ...existing,
    ...changes,
    modifiedOn: undefined,
  });

  if (post.getHash() === existing.hash) {
    return existing;
  }

  return postRepository.update({ id }, {
    id: post.getId(),
    hash: post.getHash(),
    modifiedOn: post.getModifiedOn(),
    text: post.getText(),
    title: post.getTitle(),
  });
};

export default makeEditPost;
