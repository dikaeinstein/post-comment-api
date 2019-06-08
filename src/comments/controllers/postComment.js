import HttpStatus from 'http-status-codes';


/**
 * @callback PostComment
 * @param {import('../controllers').Request} httpRequest
 * @return {Promise<import('../controllers').Response | Error>}
 */

/**
 * Factory function to create the postComment controller
 * @param {object} params
 * @param {import('../useCases/addComment').AddComment} params.addComment
 * @returns {PostComment}
 */
const makePostComment = ({ addComment }) => async (httpRequest) => {
  try {
    const { ...commentInfo } = httpRequest.body;
    const source = {};
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];

    if (httpRequest.headers.Referer) {
      source.referer = httpRequest.headers.Referer;
    }

    const posted = await addComment({ ...commentInfo, source });

    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(posted.modifiedOn).toUTCString(),
      },
      statusCode: HttpStatus.CREATED,
      body: { posted },
    };
  } catch (err) {
    throw err;
  }
};

export default makePostComment;
