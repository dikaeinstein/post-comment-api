/**
 * Represents the Comment data repository
 */
class CommentRepository {
  /**
   * @param {object} params
   * @param {import('model').Model<import('comment').Comment>} params.model Comment model
   */
  constructor({ model }) {
    this.model = model;
  }

  /**
   * Find all comments
   * @param {*} query
   * @param {*} [projections]
   * @param {*} [options]
   * @returns {Promise<import('comment').Comment[]>}
   */
  async findAll(query, projections, options) {
    return this.model.find(query, projections, options);
  }

  /**
   * Find all comments by comment id
   * @param {string} id
   * @param {*} [projection]
   * @param {*} [options]
   * @returns {Promise<import('comment').Comment>}
   */
  async findById(id, projection, options) {
    return this.model.findOne({ id }, projection, options);
  }

  /**
   * Find all comments by postId
   * @param {*} postId
   * @returns {Promise<import('comment').Comment[]>}
   */
  async findByPostId(postId) {
    return this.model.find({ postId });
  }

  /**
   * Insert comments into db. Comment info can either be an array of comment or
   * a single comment. To specify options, docs must be an array.
   * @param {*} commentInfo
   * @param {*} [options]
   * @returns {Promise<import('comment').Comment | import('comment').Comment[]>}
   */
  async insert(commentInfo, options) {
    return this.model.create(commentInfo, options);
  }

  /**
   * Update a single comment
   * @param {object} query
   * @param {object} commentInfo
   * @param {object} [options]
   * @returns {Promise<import('comment').Comment>}
   */
  async update(query, commentInfo, options) {
    return this.model.findOneAndUpdate(query, commentInfo, {
      new: true, ...options,
    });
  }

  /**
   * Remove a single comment
   * @param {object} options
   * @returns {Promise<import('comment').Comment>}
   */
  async remove(options) {
    const { id, ...others } = options;
    return this.model.findOneAndRemove({ id, ...others });
  }

  /**
   * Find comment by hash
   * @param {string} hash
   * @returns {Promise<import('comment').Comment>}
   */
  async findByHash(hash) {
    return this.model.findOne({ hash });
  }
}

export default CommentRepository;
