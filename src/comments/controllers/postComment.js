import HttpStatus from 'http-status-codes';


/**
 * Factory function to create the postComment controller
 * @param {object} params
 * @param {import('comment').addComment} params.addComment
 * @returns {import('comment').PostComment}
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
