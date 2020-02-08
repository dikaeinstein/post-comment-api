import HttpStatus from 'http-status-codes';


/**
 * Factory function to create deletePost HTTP controller
 * @param {object} params
 * @param {import('post').removePost} params.removePost
 * @returns {import('post').DeletePost}
 */
const makeDeletePost = ({ removePost }) => async (httpRequest) => {
  const { id } = httpRequest.params;

  const deleted = await removePost(id);

  return {
    headers: { 'Content-Type': 'Application/json' },
    statusCode: HttpStatus.OK,
    body: { deleted },
  };
};

export default makeDeletePost;
