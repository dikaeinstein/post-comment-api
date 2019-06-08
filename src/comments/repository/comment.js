/**
 * @template T
 * @typedef {Object<Function, any>} Model Provides the interface to the data store.
 * @property {(doc, options?) => Promise<T>} create
 * @property {(condition, projections?, options?) => Promise<T[]>} find
 * @property {(condition, projection?, options?) => Promise<T>} findOne
 * @property {(condition, attrs, options?) => Promise<T>} findOneAndUpdate
 * @property {(condition, options?) => Promise<T>} findOneAndRemove
 */

/**
 * @typedef {import('../comment/comment').Comment & { hash: string }} Comment
 */

/**
 * @typedef {Object<Function,any>} DB The database connection
 * @property {(name: string, schema) => Model<Comment>} model
 */

/**
 * @typedef {import('mongoose').Schema} Schema
 */

/**
 * Represents the Comment data repository (knows a little implementation detail(Mongoose))
 */
class CommentRepository {
  /**
   * @param {object} params
   * @param {DB} params.db Database connection
   * @param {Schema} [params.schema]
   * @param {((schema: Schema) => void)[]} [params.plugins]
   */
  constructor({ db, schema, plugins = [] }) {
    if (schema && plugins) {
      plugins.forEach((plugin) => {
        schema.plugin(plugin);
      });
    }
    this.model = db.model('Comment', schema);
  }

  /**
   * Find all comments
   * @param {*} query
   * @param {*} [projections]
   * @param {*} [options]
   */
  async findAll(query, projections, options) {
    return this.model.find(query, projections, options);
  }

  /**
   * Find all comments by comment id
   * @param {string} id
   * @param {*} [projection]
   * @param {*} [options]
   */
  async findById(id, projection, options) {
    return this.model.findOne({ id }, projection, options);
  }

  /**
   * Find all comments by postId
   * @param {*} postId
   */
  async findByPostId(postId) {
    return this.model.find({ postId });
  }

  /**
   * Insert comments into db. Comment info can either be an array of documents or
   * a single document. To specify options, docs must be an array.
   * @param {*} commentInfo
   * @param {*} [options]
   */
  async insert(commentInfo, options) {
    return this.model.create(commentInfo, options);
  }

  /**
   * Update a single comment
   * @param {object} query
   * @param {object} commentInfo
   * @param {object} [options]
   */
  async update(query, commentInfo, options) {
    return this.model.findOneAndUpdate(query, commentInfo, {
      new: true, ...options,
    });
  }

  /**
   * Remove a single comment
   * @param {object} options
   */
  async remove(options) {
    const { id, ...others } = options;
    return this.model.findOneAndRemove({ id, ...others });
  }

  /**
   * Find comment by hash
   * @param {string} hash
   */
  async findByHash(hash) {
    return this.model.findOne({ hash });
  }
}

export default CommentRepository;
