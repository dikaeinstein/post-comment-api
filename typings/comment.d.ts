declare module "comment" {
  export function addComment(commentInfo: Post): Promise<Comment>
  export function editComment(postInfo: Post): Promise<Comment>
  export function listComments(postId: string): Promise<Comment[]>
  export function removeComment(commentId: string): Promise<Comment>

  type HTTPController = (httpRequest: import('common').Request) => Promise<import('common').Response | Error>
  export type DeleteComment = HTTPController
  export type GetComments = HTTPController
  export type PatchComment = HTTPController
  export type PostComment = HTTPController

  export interface Comment {
    author: string;
    createdOn?: Date;
    id?: string;
    modifiedOn?: Date;
    postId: string;
    source: any;
    text: string;
  }
  export interface Comment { hash: string; }

  export interface CommentEntity {
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
