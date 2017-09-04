import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/users';
import { getPassportInstance } from './utils/passport';
import * as authenticate from './middlewares/checkToken';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';
import * as projectController from './controllers/project';
import { validateStatusLog } from './validators/statusLog';
import * as statusLogController from './controllers/statusLog';
import * as tokenValidator from './middlewares/verifyGoogleToken';

const router = Router();

router.use(getPassportInstance().initialize());

router.get('/', homeController.getAppInfo);
router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/user/:id', userController.get);

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
  '/self/projects/:id(\\d+)/services',
  authenticate.authenticate,
  serviceController.getAll
);
router.post(
  '/self/projects/:id(\\d+)/services',
  authenticate.authenticate,
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
  userController.postData
);

router.get(
  '/auth/google',
  getPassportInstance().authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  getPassportInstance().authenticate('google', { failureRedirect: '/login' }),
  userController.loginOrSignUp
);

router.get('/services/:id(\\d+)/status', serviceController.getServiceStatus);

export default router;
