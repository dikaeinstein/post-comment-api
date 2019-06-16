import makeComment from '../comment';


/**
 * Factory function to create the editComment function
 * @param {object} params
 * @param {import('../repository/comment').default} params.commentRepository
 * @param {Function} params.assert
 * @param {(message: string) => Error} params.makeDocumentNotFoundError
 * @returns {import('comment').editComment}
 */
const makeEditComment = ({
  commentRepository, assert, makeDocumentNotFoundError,
}) => async ({ id, ...changes }) => {
  assert(id, 'You must supply a comment id.');
  assert(changes.text, 'You must supply comment text.');

  const existing = await commentRepository.findById(id, null, { lean: true });

  if (!existing) {
    throw makeDocumentNotFoundError('Comment not found.');
  }

  const comment = makeComment({
    ...existing,
    ...changes,
    modifiedOn: undefined,
  });

  if (comment.getHash() === existing.hash) {
    return existing;
  }

  return commentRepository.update({ id }, {
    id: comment.getId(),
    hash: comment.getHash(),
    modifiedOn: comment.getModifiedOn(),
    text: comment.getText(),
  });
};

export default makeEditComment;
