/**
 * Factory function to create the removePost function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @param {Function} params.assert
 * @param {(message: string) => Error} params.makeDocumentNotFoundError
 * @returns {import('post').getSinglePost}
 */
const makeGetSinglePost = ({
  postRepository, assert, makeDocumentNotFoundError,
}) => async (postId) => {
  assert(postId, 'You must supply postId.');

  const post = await postRepository.findById(postId);

  if (!post) {
    throw makeDocumentNotFoundError('Post not found.');
  }

  return post;
};

export default makeGetSinglePost;
