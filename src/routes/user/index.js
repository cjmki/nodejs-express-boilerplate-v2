import express from 'express';
import controller from './controller';
import cee from '../../util/catchExpressExceptions';

const router = express.Router();

router.get('/user/:id', cee(controller.getUserById));

export default router;
