declare module "comment" {
  function addComment(commentInfo: Post): Promise<Comment>
  function editComment(postInfo: Post): Promise<Comment>
  function listComments(postId: string): Promise<Comment[]>
  function removeComment(commentId: string): Promise<Comment>

  type DeleteComment = import('common').HTTPController
  type GetComments = import('common').HTTPController
  type PatchComment = import('common').HTTPController
  type PostComment = import('common').HTTPController

  interface Comment {
    author: string;
    createdOn?: Date;
    id?: string;
    modifiedOn?: Date;
    postId: string;
    source: any;
    text: string;
  }
  interface Comment { hash: string; }

  interface CommentEntity {
    readonly getAuthor: () => string;
    readonly getCreatedOn: () => number | Date;
    readonly getHash: () => string;
    readonly getId: () => string;
    readonly getModifiedOn: () => number | Date;
    readonly getPostId: () => string;
    readonly getSource: () => import('src/common/utils/source').Source;
    readonly getText: () => string;
  }
}
