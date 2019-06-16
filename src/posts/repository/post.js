/**
 * Represents the Post data repository
 */
class PostRepository {
  /**
   * @param {object} params
   * @param {import('model').Model<import('post').Post>} params.model Post model
   */
  constructor({ model }) {
    this.model = model;
  }

  /**
   * Find all posts
   * @param {*} query
   * @param {*} [projection]
   * @param {*} [options]
   * @returns {Promise<import('post').Post[]>}
   */
  async findAll(query, projection, options) {
    return this.model.find(query, projection, options);
  }

  /**
   * Find all posts by post id
   * @param {string} id
   * @param {*} [projection]
   * @param {*} [options]
   * @returns {Promise<import('post').Post>}
   */
  async findById(id, projection, options) {
    return this.model.findOne({ id }, projection, options);
  }

  /**
   * Insert post(s) into db. postInfo can either be an array of posts or
   * a single post. To specify options, docs must be an array.
   * @param {*} postInfo
   * @param {*} [options]
   * @returns {Promise<import('post').Post | import('post').Post[]>}
   */
  async insert(postInfo, options) {
    return this.model.create(postInfo, options);
  }

  /**
   * Update a single post
   * @param {*} query
   * @param {*} postInfo
   * @param {*} [options]
   * @returns {Promise<import('post').Post>}
   */
  async update(query, postInfo, options) {
    return this.model.findOneAndUpdate(query, postInfo, {
      new: true, ...options,
    });
  }

  /**
   * Remove a single post
   * @param {*} options
   * @returns {Promise<import('post').Post>}
   */
  async remove(options) {
    const { id, ...others } = options;
    return this.model.findOneAndRemove({ id, ...others });
  }

  /**
   * Find post by hash
   * @param {string} hash
   * @returns {Promise<import('post').Post>}
   */
  async findByHash(hash) {
    return this.model.findOne({ hash });
  }
}

export default PostRepository;
