/**
 * Factory function to create listPosts function
 * @param {object} params
 * @param {import('../repository/post').default} params.postRepository
 * @returns {import('post').listPosts}
 */
const makeListPosts = ({ postRepository }) => async () => postRepository
  .findAll({});

export default makeListPosts;
