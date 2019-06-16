import connectToDatabase from 'src/common/db';
import postSchema from '../model/postSchema';
import PostRepository from './post';


const DB_URL = process.env.NODE_ENV !== 'test'
  ? process.env.POSTS_DB_URL : process.env.POSTS_DB_URL_TEST;

const db = connectToDatabase(DB_URL);
const model = db.model('Post', postSchema);

const postRepository = new PostRepository({ model });

export default postRepository;
export { db };
