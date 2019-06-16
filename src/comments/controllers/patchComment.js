import HttpStatus from 'http-status-codes';


/**
 * @param {object} params
 * @param {import('comment').editComment} params.editComment
 * @return {import('comment').PatchComment}
 */
const makePatchComment = ({ editComment }) => async (httpRequest) => {
  try {
    const { id } = httpRequest.params;
    const { ...commentInfo } = httpRequest.body;
    const source = {};
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];
    if (httpRequest.headers.Referer) {
      source.referer = httpRequest.headers.Referer;
    }

    const patched = await editComment({ id, ...commentInfo, source });

    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(patched.modifiedOn).toUTCString(),
      },
      statusCode: HttpStatus.OK,
      body: { patched },
    };
  } catch (error) {
    throw error;
  }
};

export default makePatchComment;
