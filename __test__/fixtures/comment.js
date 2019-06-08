import faker from 'faker';

import id from 'src/common/utils/id';
import md5 from 'src/common/utils/md5';


/**
 * makeFakeComment factory function that creates a comment
 * @param {object} overrides
 * @returns {{
 *   author: string;
 *   createdOn: Date;
 *   id: string;
 *   hash: string;
 *   modifiedOn: Date;
 *   postId: string;
 *   text: string;
 *   source: {
 *     ip: string;
 *     browser: string;
 *     referer: string;
 *   };
 * }}
 */
const makeFakeComment = (overrides = {}) => {
  const comment = {
    author: faker.name.findName(),
    createdOn: Date.now(),
    id: id.makeId(),
    modifiedOn: Date.now(),
    postId: id.makeId(),
    text: faker.lorem.paragraph(3),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referer: faker.internet.url(),
    },
  };

  comment.hash = md5(comment.author + comment.postId + comment.text);

  return { ...comment, ...overrides };
};

export default makeFakeComment;
