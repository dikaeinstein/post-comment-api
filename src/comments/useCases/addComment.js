import makeComment from '../comment';


/**
 * @typedef {import('../comment/comment').Comment} Comment
 */

/**
 * @callback AddComment
 * @param {Comment} commentInfo
 * @returns {Promise<Comment & { hash: string }>}
 */

/**
 * Factory function to create the addComment function
 * @param {object} params
 * @param {import('../repository/comment').default} params.commentRepository
 * @returns {AddComment}
 */
const makeAddComment = ({ commentRepository }) => async (commentInfo) => {
  const comment = makeComment(commentInfo);
  const exists = await commentRepository.findByHash(comment.getHash());

  if (exists) {
    return exists;
  }

  const commentSource = comment.getSource();

  return commentRepository.insert({
    author: comment.getAuthor(),
    createdOn: comment.getCreatedOn(),
    hash: comment.getHash(),
    id: comment.getId(),
    modifiedOn: comment.getModifiedOn(),
    postId: comment.getPostId(),
    source: {
      browser: commentSource.getBrowser(),
      ip: commentSource.getIp(),
      referer: commentSource.getReferer(),
    },
    text: comment.getText(),
  });
};

export default makeAddComment;
