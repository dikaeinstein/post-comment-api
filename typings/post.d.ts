declare module "post" {
  export function addPost(postInfo: Post): Promise<Post>
  export function editPost(postInfo: Post): Promise<Post>
  export function getSinglePost(postId: string): Promise<Post>
  export function listPosts(): Promise<Post[]>
  export function removePost(postId: string): Promise<Post>

  type HTTPController = (httpRequest: import('common').Request) => Promise<import('common').Response | Error>
  export type DeletePost = HTTPController
  export type GetPost = HTTPController
  export type GetPosts = HTTPController
  export type PatchPost = HTTPController
  export type PostPost = HTTPController

  export interface Post {
    author: string;
    createdOn?: Date;
    id?: string;
    modifiedOn?: Date
    source: any;
    text: string;
    title: string;
  }
  export interface Post { hash: string; }

  export interface PostEntity {
    readonly getAuthor: () => string;
    readonly getCreatedOn: () => number | Date;
    readonly getHash: () => string;
    readonly getId: () => string;
    readonly getModifiedOn: () => number | Date;
    readonly getSource: () => import('src/common/utils/source').Source;
    readonly getText: () => string;
    readonly getTitle: () => string;
  }
}
