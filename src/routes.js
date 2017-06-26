import { Router } from 'express';
import * as homeController from './controllers/home';
import * as serviceController from './controllers/service';
import * as statusLogController from './controllers/statusLog';

const router = Router();

router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);

// Latest status of Services
router.get('/status', statusLogController.getLatestStatus);

// Status Change logs
router.get('/status/logs', statusLogController.getAll);

// Services
router.get('/services', serviceController.getAll);
router.get('/services/:id', serviceController.get);

export default router;
