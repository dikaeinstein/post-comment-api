import Joi from '@hapi/joi';

import { makeUnProcessableEntityError } from 'src/common/errors';
import id from 'src/common/utils/id';
import buildIsValidIP from 'src/common/utils/isValidIP';
import md5 from 'src/common/utils/md5';
import buildMakeSource from 'src/common/utils/source';
import buildMakeComment from './comment';


const isValidIP = buildIsValidIP({ schemaBuilder: Joi });
const makeSource = buildMakeSource({ isValidIP });
const makeComment = buildMakeComment({
  Id: id,
  md5,
  schemaBuilder: Joi,
  makeSource,
  makeUnProcessableEntityError,
});

export default makeComment;
