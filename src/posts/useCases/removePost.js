/**
 * Factory function to create the removePost function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @param {Function} params.assert
 * @param {(message: string) => Error} params.makeDocumentNotFoundError
 * @returns {import('post').removePost}
 */
const makeRemovePost = ({
  postRepository, assert, makeDocumentNotFoundError,
}) => async (postId) => {
  assert(postId, 'You must supply a post id');

  const postToDelete = await postRepository.findById(postId);

  if (!postToDelete) {
    throw makeDocumentNotFoundError('Post not found.');
  }

  return postRepository.remove({ id: postToDelete.id });
};

export default makeRemovePost;
