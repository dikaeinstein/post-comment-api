import HttpStatus from 'http-status-codes';


/**
 * @callback PatchComment
 * @param {import('../controllers').Request} httpRequest
 * @returns {Promise<import('../controllers').Response | Error>}
 */

/**
 * @param {object} params
 * @param {import('../useCases/editComment').EditComment} params.editComment
 * @return {PatchComment}
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
