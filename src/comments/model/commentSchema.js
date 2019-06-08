/* eslint-disable no-underscore-dangle */
import { Schema } from 'mongoose';


const commentSchema = new Schema({
  author: { type: String, required: true },
  id: { type: String, required: true },
  createdOn: { type: Date, required: true },
  hash: { type: String, required: true },
  modifiedOn: { type: Date, required: true },
  postId: { type: String, required: true },
  source: { type: {}, required: true },
  text: { type: String, required: true },
}, {
  id: false,
});

commentSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    // eslint-disable-next-line no-param-reassign
    delete ret._id;
  },
});

commentSchema.index({ id: 1 }, { name: 'id_idx', unique: true });
commentSchema.index({ hash: 1 }, { name: 'hash_idx', unique: true });
commentSchema.index({ postId: 1 }, { name: 'postId_idx' });

export default commentSchema;
