import HttpStatus from 'http-status-codes';


/**
 * @param {object} params
 * @param {import('comment').listComments} params.listComments
 * @returns {import('comment').GetComments}
 */
const makeGetComments = ({ listComments }) => async (httpRequest) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const comments = await listComments(httpRequest.query.postId);

    return {
      headers,
      statusCode: HttpStatus.OK,
      body: { comments },
    };
  } catch (err) {
    throw err;
  }
};

export default makeGetComments;
