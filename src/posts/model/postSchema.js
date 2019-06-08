/* eslint-disable no-underscore-dangle */
import { Schema } from 'mongoose';


const postSchema = new Schema({
  author: { type: String, required: true },
  createdOn: { type: String, required: true },
  hash: { type: String, required: true },
  id: { type: String, required: true },
  modifiedOn: { type: String, required: true },
  source: { type: {}, required: true },
  text: { type: String, required: true },
  title: { type: String, required: true },
}, {
  id: false,
});

postSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    // eslint-disable-next-line no-param-reassign
    delete ret._id;
  },
});

postSchema.index({ id: 1 }, { name: 'id_idx', unique: true });
postSchema.index({ hash: 1 }, { name: 'hash_idx', unique: true });

export default postSchema;
