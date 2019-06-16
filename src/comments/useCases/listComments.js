/**
 * Factory function to create listComments function
 * @param {object} params
 * @param {import('../repository/comment').default} params.commentRepository
 * @param {Function} params.assert
 * @returns {import('comment').listComments}
 */
const makeListComments = ({ commentRepository, assert }) => async (postId) => {
  assert(postId, 'You must supply postId.');

  return commentRepository.findByPostId(postId);
};

export default makeListComments;
