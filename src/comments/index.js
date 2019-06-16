import Router from 'koa-router';

import makeKoaController from 'src/common/koaController';
import controllers from './controllers';
import { db } from './repository';


const router = new Router({ prefix: '/comments' });

router.get('/', makeKoaController(controllers.getComments));
router.post('/', makeKoaController(controllers.postComment));
router.patch('/:id', makeKoaController(controllers.patchComment));
router.delete('/:id', makeKoaController(controllers.deleteComment));

export default Object.freeze({ db, router });
