import HttpStatus from 'http-status-codes';


/**
 * @param {object} params
 * @param {import('post').editPost} params.editPost
 * @return {import('post').PatchPost}
 */
const makePatchPost = ({ editPost }) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const { ...postInfo } = httpRequest.body;
  const source = {};

  source.ip = httpRequest.ip;
  source.browser = httpRequest.headers['User-Agent'];
  if (httpRequest.headers.Referer) {
    source.referer = httpRequest.headers.Referer;
  }

  const patched = await editPost({ id, ...postInfo, source });

  return {
    headers: {
      'Content-Type': 'application/json',
      'Last-Modified': new Date(patched.modifiedOn).toUTCString(),
    },
    statusCode: HttpStatus.OK,
    body: { patched },
  };
};

export default makePatchPost;
