import connectToDatabase from 'src/common/db';
import CommentRepository from './comment';
import commentSchema from '../model/commentSchema';


const DB_URL = process.env.NODE_ENV !== 'test'
  ? process.env.COMMENTS_DB_URL : process.env.COMMENTS_DB_URL_TEST;

const db = connectToDatabase(DB_URL);
const commentRepository = new CommentRepository({
  db, schema: commentSchema,
});

export default commentRepository;
export { db };
