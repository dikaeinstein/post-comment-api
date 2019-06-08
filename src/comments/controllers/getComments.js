import HttpStatus from 'http-status-codes';


/** @typedef {import('../controllers').Request} Request */
/** @typedef {import('../controllers').Response} Response */

/** @typedef {import('../comment/comment').Comment} Comment */

/**
 * @param {object} params
 * @param {import('../useCases/listComments').ListComments} params.listComments
 * @returns {(httpRequest: Request) => Promise<Response | Error>}
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
