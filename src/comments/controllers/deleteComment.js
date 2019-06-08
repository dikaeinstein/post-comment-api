import HttpStatus from 'http-status-codes';


/**
 * @callback DeleteComment
 * @param {import('../controllers').Request} httpRequest
 * @returns {Promise<import('../controllers').Response | Error>}
 */

/**
 * @param {object} params
 * @param {import('../useCases/removeComment').RemoveComment} params.removeComment
 * @returns {DeleteComment}
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
