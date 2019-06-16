import Router from 'koa-router';

import makeKoaController from 'src/common/koaController';
import controllers from './controllers';
import { db } from './repository';


const router = new Router({ prefix: '/posts' });

router.get('/', makeKoaController(controllers.getPosts));
router.get('/:id', makeKoaController(controllers.getPost));
router.post('/', makeKoaController(controllers.postPost));
router.patch('/:id', makeKoaController(controllers.patchPost));
router.delete('/:id', makeKoaController(controllers.deletePost));

export default Object.freeze({ db, router });
