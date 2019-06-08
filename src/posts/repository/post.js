/**
 * @template T
 * @typedef {Object<Function, any>} Model Provides the interface to the data store.
 * @property {(doc, options?) => Promise<T>} create
 * @property {(condition, projection?, options?) => Promise<T[]>} find
 * @property {(condition, projection?, options?) => Promise<T>} findOne
 * @property {(condition, attrs, options?) => Promise<T>} findOneAndUpdate
 * @property {(condition, options?) => Promise<T>} findOneAndRemove
 */

/**
 * @typedef {import('../post/post').Post & { hash: string }} Post
 */

/**
 * @typedef {Object<Function,any>} DB The database connection
 * @property {(name: string, schema) => Model<Post>} model
 */

/**
 * @typedef {import('mongoose').Schema} Schema
 */


/**
 * Represents the Post data repository (knows a little implementation detail(Mongoose))
 */
class PostRepository {
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

    this.model = db.model('Post', schema);
  }

  /**
   * Find all posts
   * @param {*} query
   * @param {*} [projection]
   * @param {*} [options]
   */
  async findAll(query, projection, options) {
    return this.model.find(query, projection, options);
  }

  /**
   * Find all posts by post id
   * @param {string} id
   * @param {*} [projection]
   * @param {*} [options]
   */
  async findById(id, projection, options) {
    return this.model.findOne({ id }, projection, options);
  }

  /**
   * Insert post(s) into db. postInfo can either be an array of documents or
   * a single document. To specify options, docs must be an array.
   * @param {*} postInfo
   * @param {*} [options]
   */
  async insert(postInfo, options) {
    return this.model.create(postInfo, options);
  }

  /**
   * Update a single post
   * @param {*} query
   * @param {*} postInfo
   * @param {*} [options]
   */
  async update(query, postInfo, options) {
    return this.model.findOneAndUpdate(query, postInfo, {
      new: true, ...options,
    });
  }

  /**
   * Remove a single post
   * @param {*} options
   */
  async remove(options) {
    const { id, ...others } = options;
    return this.model.findOneAndRemove({ id, ...others });
  }

  /**
   * Find post by hash
   * @param {string} hash
   */
  async findByHash(hash) {
    return this.model.findOne({ hash });
  }
}

export default PostRepository;
