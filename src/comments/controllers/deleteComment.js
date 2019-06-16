import HttpStatus from 'http-status-codes';


/**
 * @param {object} params
 * @param {import('comment').removeComment} params.removeComment
 * @returns {import('comment').DeleteComment}
 */
const makeDeleteComment = ({ removeComment }) => async (httpRequest) => {
  try {
    const { id } = httpRequest.params;

    const deleted = await removeComment(id);
    return {
      headers: { 'Content-Type': 'Application/json' },
      statusCode: HttpStatus.OK,
      body: { deleted },
    };
  } catch (error) {
    throw error;
  }
};

export default makeDeleteComment;
