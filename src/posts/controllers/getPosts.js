import HttpStatus from 'http-status-codes';


/**
 * Factory function to create getPosts controller
 * @param {object} params
 * @param {import('post').listPosts} params.listPosts
 * @returns {import('post').GetPosts}
 */
const makeGetPosts = ({ listPosts }) => async () => {
  const headers = { 'Content-Type': 'application/json' };

  const posts = await listPosts();

  return {
    headers,
    statusCode: HttpStatus.OK,
    body: { posts },
  };
};

export default makeGetPosts;
