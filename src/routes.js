import { Router } from 'express';
import * as homeController from './controllers/home';
import * as statusController from './controllers/status';

const router = Router();

router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);
router.get('/status', statusController.getStatus);

export default router;
