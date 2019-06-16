import commentService from '../useCases';
import makeDeleteComment from './deleteComment';
import makeGetComments from './getComments';
import makePatchComment from './patchComment';
import makePostComment from './postComment';


const {
  addComment,
  editComment,
  listComments,
  removeComment,
} = commentService;

const deleteComment = makeDeleteComment({ removeComment });
const getComments = makeGetComments({ listComments });
const patchComment = makePatchComment({ editComment });
const postComment = makePostComment({ addComment });

export default Object.freeze({
  deleteComment, getComments, patchComment, postComment,
});
