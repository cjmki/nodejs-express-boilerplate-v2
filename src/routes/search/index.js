import express from 'express';
import controller from './controller';
import cee from '../../util/catchExpressExceptions';

const router = express.Router();

router.get('/search', cee(controller.search));
router.get('/suggest', cee(controller.suggest));
router.get('/filter', cee(controller.searchByFilter));

export default router;
