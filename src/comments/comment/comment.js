/**
 * Factory function to create the makeComment function
 * @param {object} params
 * @param {import('src/common/utils/id').Id} params.Id
 * @param {(text: string) => string} params.md5
 * @param {import('@hapi/joi')} params.schemaBuilder
 * @param {import('src/common/utils/source').MakeSource} params.makeSource
 * @param {(message: string) => Error} params.makeUnProcessableEntityError
 * @returns {(comment: import('comment').Comment) => import('comment').CommentEntity}
 */
const buildMakeComment = ({
  Id, md5, schemaBuilder, makeSource, makeUnProcessableEntityError,
}) => (comment) => {
  const schema = schemaBuilder.object({
    author: schemaBuilder.string().min(2).required().error((errors) => {
      // @ts-ignore
      const minError = errors.find(err => err.code === 'string.min');
      if (minError) {
        return new Error(
          "Comment author's name must be longer than 2 characters.",
        );
      }
      return new Error('Comment must have an author.');
    }),
    source: schemaBuilder.object().required()
      .error(new Error('Comment must have a source.')),
    text: schemaBuilder.string().min(1).required()
      .error(new Error('Comment must include at least one character of text.')),
    postId: schemaBuilder.string().required()
      .error(new Error('Comment must contain a postId.')),
  });

  const {
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
    postId,
    source,
    text,
  } = comment;

  const result = schema.validate({
    author, postId, source, text,
  });

  if (result.error) {
    throw makeUnProcessableEntityError(result.error.message);
  }

  if (!Id.isValid(id)) {
    throw makeUnProcessableEntityError('Comment must have a valid id.');
  }

  const validSource = makeSource({
    entityName: 'Comment',
    ...source,
    makeError: makeUnProcessableEntityError,
  });
  const makeHash = () => md5(author + postId + text);

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
    getPostId: () => postId,
    getSource: () => validSource,
    getText: () => text,
  });
};

export default buildMakeComment;
