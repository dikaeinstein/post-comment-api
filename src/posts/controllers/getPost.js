import HttpStatuses from 'http-status-codes';


/**
 * Factory function to create the getPost HTTP controller
 * @param {object} params
 * @param {import('post').getSinglePost} params.getSinglePost
 * @returns {import('post').GetPost}
 */
const makeGetPost = ({ getSinglePost }) => async (httpRequest) => {
  const headers = { 'Content-Type': 'application/json' };

  const { id } = httpRequest.params;

  const post = await getSinglePost(id);

  return {
    headers,
    statusCode: HttpStatuses.OK,
    body: { post },
  };
};

export default makeGetPost;
