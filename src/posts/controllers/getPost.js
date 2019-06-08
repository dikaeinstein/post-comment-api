import HttpStatuses from 'http-status-codes';


/**
 * @callback GetPost
 * @param {import('../controllers').Request} httpRequest
 * @returns {Promise<import('../controllers').Response | Error>}
 */

/**
 * Factory function to create the getPost HTTP controller
 * @param {object} params
 * @param {import('../useCases/viewSinglePost').ViewSinglePost} params.viewSinglePost
 * @returns {GetPost}
 */
const makeGetPost = ({ viewSinglePost }) => async (httpRequest) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const { id } = httpRequest.params;

    const post = await viewSinglePost(id);

    return {
      headers,
      statusCode: HttpStatuses.OK,
      body: { post },
    };
  } catch (error) {
    throw error;
  }
};

export default makeGetPost;
