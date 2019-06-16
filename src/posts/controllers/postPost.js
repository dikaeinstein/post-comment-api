import HttpStatus from 'http-status-codes';


/**
 * @callback PostPost
 * @param {import('../controllers').Request} httpRequest
 * @return {Promise<import('../controllers').Response | Error>}
 */

/**
 * Factory function to create the postPost controller
 * @param {object} params
 * @param {import('post').addPost} params.addPost
 * @returns {PostPost}
 */
const makePostPost = ({ addPost }) => async (httpRequest) => {
  try {
    const { ...postInfo } = httpRequest.body;
    const source = {};
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];

    if (httpRequest.headers.Referer) {
      source.referer = httpRequest.headers.Referer;
    }

    const posted = await addPost({ ...postInfo, source });

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

export default makePostPost;
