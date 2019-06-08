import HttpStatus from 'http-status-codes';


/**
 * @callback DeletePost
 * @param {import('../controllers').Request} httpRequest
 * @returns {Promise<import('../controllers').Response | Error>}
 */

/**
 * Factory function to create deletePost HTTP controller
 * @param {object} params
 * @param {import('../useCases/removePost').RemovePost} params.removePost
 * @returns {DeletePost}
 */
const makeDeletePost = ({ removePost }) => async (httpRequest) => {
  try {
    const { id } = httpRequest.params;

    const deleted = await removePost(id);
    return {
      headers: { 'Content-Type': 'Application/json' },
      statusCode: HttpStatus.OK,
      body: { deleted },
    };
  } catch (error) {
    throw error;
  }
};

export default makeDeletePost;
