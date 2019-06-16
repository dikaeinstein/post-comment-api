/**
 * Factory function to create the makePost function
 * @param {object} params
 * @param {import('src/common/utils/id').Id} params.Id
 * @param {(text: string) => string} params.md5
 * @param {import('common').SchemaBuilder} params.schemaBuilder
 * @param {import('src/common/utils/source').MakeSource} params.makeSource
 * @param {(message: string) => Error} params.makeUnProcessableEntityError
 * @returns {(post: import('post').Post) => import('post').PostEntity}
 */
const buildMakePost = ({
  Id, md5, makeSource, schemaBuilder, makeUnProcessableEntityError,
}) => (post) => {
  const schema = schemaBuilder.object({
    author: schemaBuilder.string().min(2).required().error(errors => errors
      .map((err) => {
        if (err.type === 'string.min') {
          return {
            ...err,
            message: "Post author's name must be longer than 2 characters.",
          };
        }
        return { ...err, message: 'Post must have an author.' };
      })),
    source: schemaBuilder.object().required()
      .error(new Error('Post must have a source.')),
    text: schemaBuilder.string().min(1).required()
      .error(new Error('Post must include at least one character of text.')),
    title: schemaBuilder.string().required()
      .error(new Error('Post title must include at least one character of text.')),
  });

  const {
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
    source,
    text,
    title,
  } = post;

  const result = schemaBuilder.validate({
    author, source, text, title,
  }, schema);

  if (result.error) {
    throw makeUnProcessableEntityError(result.error.message);
  }

  if (!Id.isValid(id)) {
    throw makeUnProcessableEntityError('Post must have a valid id.');
  }

  const validSource = makeSource({
    entityName: 'Post',
    ...source,
    makeError: makeUnProcessableEntityError,
  });
  const makeHash = () => md5(author + text + title);

  /** @type {string} */
  let hash;

  return Object.freeze({
    getAuthor: () => author,
    getCreatedOn: () => createdOn,
    getHash: () => {
      if (!hash) {
        hash = makeHash();
      }
      return hash;
    },
    getId: () => id,
    getModifiedOn: () => modifiedOn,
    getSource: () => validSource,
    getText: () => text,
    getTitle: () => title,
  });
};

export default buildMakePost;
