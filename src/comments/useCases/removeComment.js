/**
 * Factory function to create the removeComment function
 * @param {object} params
 * @param {import('../repository/comment').default} params.commentRepository
 * @param {Function} params.assert
 * @param {(message: string) => Error} params.makeDocumentNotFoundError
 * @returns {import('comment').removeComment}
 */
const makeRemoveComment = ({
  commentRepository, assert, makeDocumentNotFoundError,
}) => async (commentId) => {
  assert(commentId, 'You must supply a comment id.');

  const commentToDelete = await commentRepository.findById(commentId);

  if (!commentToDelete) {
    throw makeDocumentNotFoundError('Comment not found.');
  }

  return commentRepository.remove({ id: commentToDelete.id });
};

export default makeRemoveComment;
