import { Router } from 'express';
import * as homeController from './controllers/home';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';

const router = Router();

router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);

// Latest status of Services
router.get('/status', statusController.getStatus);

// Services
router.get('/services', serviceController.getAll);
router.get('/services/:id', serviceController.get);

export default router;
