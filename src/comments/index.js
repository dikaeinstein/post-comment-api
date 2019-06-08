import Router from 'koa-router';

import makeKoaController from 'src/common/koaController';
import { db } from './repository';
import {
  deleteComment,
  getComments,
  patchComment,
  postComment,
} from './controllers';


const router = new Router({ prefix: '/comments' });

router.get('/', makeKoaController(getComments));
router.post('/', makeKoaController(postComment));
router.patch('/:id', makeKoaController(patchComment));
router.delete('/:id', makeKoaController(deleteComment));

export default Object.freeze({ db, router });
export { db, router };
