import faker from 'faker';

import id from 'src/common/utils/id';
import md5 from 'src/common/utils/md5';


/**
 * makeFakePost factory function that creates a post
 * @param {object} overrides
 * @returns {{
  *   author: string;
  *   createdOn: Date;
  *   id: string;
  *   hash: string;
  *   modifiedOn: Date;
  *   text: string;
  *   title: string;
  *   source: {
  *     ip: string;
  *     browser: string;
  *     referer: string;
  *   };
  * }}
  */
const makeFakePost = (overrides = {}) => {
  const post = {
    author: faker.name.findName(),
    createdOn: Date.now(),
    id: id.makeId(),
    modifiedOn: Date.now(),
    title: faker.lorem.lines(1),
    text: faker.lorem.paragraph(3),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referer: faker.internet.url(),
    },
  };

  post.hash = md5(post.author + post.text + post.title);

  return { ...post, ...overrides };
};

export default makeFakePost;
