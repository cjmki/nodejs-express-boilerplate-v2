import express from 'express';
import controller from './controller';
import cee from '../../util/catchExpressExceptions';
import auth from '../../middlewares/auth';
import common from '../../util/constants/common';

const router = express.Router();

router.post('/user/login', cee(controller.postLogin));
router.get(
  '/user/:id',
  cee(auth(common.USER_ROLES)),
  cee(controller.getUserById)
);

export default router;
