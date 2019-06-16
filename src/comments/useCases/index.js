import assert from 'assert';

import { makeDocumentNotFoundError } from 'src/common/errors';
import makeAddComment from './addComment';
import makeEditComment from './editComment';
import makeListComments from './listComments';
import makeRemoveComment from './removeComment';
import commentRepository from '../repository';


const addComment = makeAddComment({ commentRepository });
const editComment = makeEditComment({
  commentRepository, assert, makeDocumentNotFoundError,
});
const listComments = makeListComments({ commentRepository, assert });
const removeComment = makeRemoveComment({
  commentRepository, assert, makeDocumentNotFoundError,
});

const commentService = Object.freeze({
  addComment,
  editComment,
  listComments,
  removeComment,
});

export default commentService;
