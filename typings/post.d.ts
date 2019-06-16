declare module "post" {
  function addPost(postInfo: Post): Promise<Post>
  function editPost(postInfo: Post): Promise<Post>
  function getSinglePost(postId: string): Promise<Post>
  function listPosts(): Promise<Post[]>
  function removePost(postId: string): Promise<Post>

  type DeletePost = import('common').HTTPController
  type GetPost = import('common').HTTPController
  type GetPosts = import('common').HTTPController
  type PatchPost = import('common').HTTPController
  type PostPost = import('common').HTTPController

  interface Post {
    author: string;
    createdOn?: Date;
    id?: string;
    modifiedOn?: Date
    source: any;
    text: string;
    title: string;
  }
  interface Post { hash: string; }

  interface PostEntity {
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
