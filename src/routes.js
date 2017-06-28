import { Router } from 'express';
// Controllers
import * as homeController from './controllers/home';
import * as serviceController from './controllers/service';
import * as statusLogController from './controllers/statusLog';
// Validators
import { validateStatusLog } from './validators/statusLog';

const router = Router();

router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);

// Latest status of Services
router.get('/status', statusLogController.getLatestStatus);

// Status Change logs
router.get('/status/logs', statusLogController.getAll);
router.post('/status/logs', validateStatusLog, statusLogController.save);

// Services
router.get('/services', serviceController.getAll);
router.get('/services/:id(\d+)', serviceController.get);
router.post('/services/synchronize', serviceController.synchronize); // TODO: Auth Token

export default router;
