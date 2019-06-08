/**
 * @typedef {import('../post/post').Post} Post
 */

/**
 * @callback ListPosts
 * @return {Promise<(Post & { hash: string })[]>}
 */

/**
 * Factory function to create listPosts function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @returns {ListPosts}
 */
const makeListPosts = ({ postRepository }) => async () => postRepository
  .findAll({});

export default makeListPosts;
