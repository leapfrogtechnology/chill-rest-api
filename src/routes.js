import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/users';
import { getPassportInstance } from './utils/passport';
import * as authenticate from './middlewares/checkToken';
import * as redirection from './middlewares/redirection';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';
import * as projectController from './controllers/project';
import { validateStatusLog } from './validators/statusLog';
import { validateProjectData } from './validators/project';
import { validateServiceData } from './validators/service';
import * as statusLogController from './controllers/statusLog';
import * as tokenValidator from './middlewares/verifyGoogleToken';
import { validateNotificationData } from './validators/notification';

const router = Router();

router.use(getPassportInstance().initialize());

router.get('/', homeController.getAppInfo);
router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/self', authenticate.authenticate, userController.get);

router.get('/status', statusLogController.getLatestStatus);
router.get('/projects/:projectId/status/logs', statusLogController.getAll);
router.post(
  '/projects/:projectId/status',
  validateStatusLog,
  statusLogController.save
);

router.get(
  '/self/projects',
  authenticate.authenticate,
  projectController.showAll
);
router.post(
  '/self/projects',
  authenticate.authenticate,
  validateProjectData,
  projectController.create
);
router.get(
  '/self/projects/:projectId(\\d+)',
  authenticate.authenticate,
  projectController.get
);
router.put(
  '/self/projects/:projectId(\\d+)',
  authenticate.authenticate,
  projectController.updateProject
);
router.delete(
  '/self/projects/:projectId(\\d+)',
  authenticate.authenticate,
  projectController.deleteProject
);
router.get(
  '/self/projects/:id(\\d+)/notifications',
  authenticate.authenticate,
  projectController.findNotification
);
router.put(
  '/self/projects/:id(\\d+)/notifications',
  authenticate.authenticate,
  validateNotificationData,
  projectController.updateNotification
);

router.get(
  '/self/projects/:id(\\d+)/services',
  authenticate.authenticate,
  serviceController.getAll
);
router.post(
  '/self/projects/:id(\\d+)/services',
  authenticate.authenticate,
  validateServiceData,
  serviceController.create
);
router.get(
  '/self/projects/:id(\\d+)/services/:serviceId(\\d+)',
  authenticate.authenticate,
  serviceController.get
);
router.put(
  '/self/projects/:projectId(\\d+)/services/:serviceId(\\d+)',
  authenticate.authenticate,
  serviceController.updateService
);
router.delete(
  '/self/projects/:projectId(\\d+)/services/:serviceId(\\d+)',
  authenticate.authenticate,
  serviceController.deleteService
);

router.get('/statuses', statusController.getAll);

router.get('/status', serviceController.getServiceStatus);

router.post(
  '/auth/callback',
  tokenValidator.verifyToken,
  userController.loginOrSignUp
);

router.get('/services/:id(\\d+)/status', serviceController.getServiceStatus);

export default router;
