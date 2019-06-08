import HttpStatus from 'http-status-codes';


/** @typedef {import('../controllers').Request} Request */
/** @typedef {import('../controllers').Response} Response */

/** @typedef {import('../post/post').Post} Post */


/**
 * Factory function to create getPosts controller
 * @param {object} params
 * @param {import('../useCases/listPosts').ListPosts} params.listPosts
 * @returns {(httpRequest: Request) => Promise<Response | Error>}
 */
const makeGetPosts = ({ listPosts }) => async () => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const posts = await listPosts();

    return {
      headers,
      statusCode: HttpStatus.OK,
      body: { posts },
    };
  } catch (err) {
    throw err;
  }
};

export default makeGetPosts;
