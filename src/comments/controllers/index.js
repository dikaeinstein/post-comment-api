import {
  addComment,
  editComment,
  listComments,
  removeComment,
} from '../useCases';
import makeDeleteComment from './deleteComment';
import makeGetComments from './getComments';
import makePatchComment from './patchComment';
import makePostComment from './postComment';


/**
 * @typedef {object} Response
 * @property {object} headers
 * @property {number} statusCode
 * @property {object} [body]
 */

/**
 * @typedef {object} Request
 * @property {object} headers
 * @property {object} [query]
 * @property {object} [params]
 * @property {object} [body]
 * @property {string} ip
 */

const deleteComment = makeDeleteComment({ removeComment });
const getComments = makeGetComments({ listComments });
const patchComment = makePatchComment({ editComment });
const postComment = makePostComment({ addComment });

const commentControllers = Object.freeze({
  deleteComment, getComments, patchComment, postComment,
});

export default commentControllers;
export {
  deleteComment, getComments, patchComment, postComment,
};
