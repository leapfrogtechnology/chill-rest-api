import passport from 'passport';
import { Router } from 'express';
import passportConfig from './config/passport';
import * as homeController from './controllers/home';
import * as userController from './controllers/users';
import * as authenticate from './middlewares/checkToken';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';
import * as projectController from './controllers/project';
import { validateStatusLog } from './validators/statusLog';
import * as statusLogController from './controllers/statusLog';

const router = Router();

passportConfig(passport);

router.use(passport.initialize());

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
  '/self/projects/:projectId',
  authenticate.authenticate,
  projectController.get
);
router.put(
  '/self/projects/:projectId',
  authenticate.authenticate,
  projectController.updateProject
);
router.delete(
  '/self/projects/:projectId',
  authenticate.authenticate,
  projectController.deleteProject
);

router.get(
  '/self/projects/:id/services',
  authenticate.authenticate,
  serviceController.getAll
);
router.post(
  '/self/projects/:id/services',
  authenticate.authenticate,
  serviceController.create
);
router.get(
  '/self/projects/:id/services/:serviceid',
  authenticate.authenticate,
  serviceController.get
);
router.put(
  '/self/projects/:projectId/services/:serviceId',
  authenticate.authenticate,
  serviceController.updateService
);
router.delete(
  '/self/projects/:projectId/services/:serviceId',
  authenticate.authenticate,
  serviceController.deleteService
);

router.get('/statuses', statusController.getAll);
router.get('/status', serviceController.getServiceStatus);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  userController.loginOrSignUp
);

export default router;
