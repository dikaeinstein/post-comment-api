import Router from 'koa-router';

import makeKoaController from 'src/common/koaController';
import { db } from './repository';
import {
  deletePost,
  getPost,
  getPosts,
  patchPost,
  postPost,
} from './controllers';


const router = new Router({ prefix: '/posts' });

router.get('/', makeKoaController(getPosts));
router.get('/:id', makeKoaController(getPost));
router.post('/', makeKoaController(postPost));
router.patch('/:id', makeKoaController(patchPost));
router.delete('/:id', makeKoaController(deletePost));

export default Object.freeze({ db, router });
export { db, router };
