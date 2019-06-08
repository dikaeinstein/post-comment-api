import Joi from '@hapi/joi';

import id from 'src/common/utils/id';
import { makeUnProcessableEntityError } from 'src/common/errors';
import md5 from 'src/common/utils/md5';
import buildIsValidIP from 'src/common/utils/isValidIP';
import buildMakeSource from 'src/common/utils/source';
import buildMakePost from './post';


const isValidIP = buildIsValidIP({ schemaBuilder: Joi });
const makeSource = buildMakeSource({ isValidIP });
const makePost = buildMakePost({
  Id: id,
  md5,
  schemaBuilder: Joi,
  makeSource,
  makeUnProcessableEntityError,
});

export default makePost;
