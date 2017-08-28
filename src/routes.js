import { Router } from 'express';

import { validateStatusLog } from './validators/statusLog';

import * as homeController from './controllers/home';
import * as statusController from './controllers/status';
import * as serviceController from './controllers/service';
import * as statusLogController from './controllers/statusLog';
import profile from './controllers/profile';
import * as userController from './controllers/users'; 
import * as projectController from './controllers/project';
import passport from 'passport';
import passportConfig from './config/passport';
import * as authenticate from './middlewares/checkToken';

passportConfig(passport);
const router = Router();

router.use('/profile', authenticate.authenticate, profile);
router.use(passport.initialize());
// router.use(passport.session());
router.get('/swagger.json', homeController.getSwaggerSpec);
router.get('/', homeController.getAppInfo);
router.get('/user/:id', userController.get);

// Current status of services
router.get('/status', statusLogController.getLatestStatus);

// Status Change logs
router.get('/status/logs', statusLogController.getAll);
router.post('/status/logs', validateStatusLog, statusLogController.save); // TODO: Auth Token

// Services
router.get('/services', serviceController.getAll);
router.get('/services/:id(\\d+)', serviceController.get);
router.get('/services/:id(\\d+)/status', serviceController.getServiceStatus);

// Statuses
router.get('/statuses', statusController.getAll);

// Google Signup with Passport
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL after signup
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), 
  userController.loginOrSignUp
);

// Add a new project of a user
router.post('/self/addProject', authenticate.authenticate, projectController.create);

// CRUD
// Retrieve all projects of a user
router.get('/self/projects', authenticate.authenticate, projectController.showAll);

// Retrieve a project from userId and projectID
router.get('/self/projects/:projectid', authenticate.authenticate, projectController.get);

// Delete a project of projectID
router.get('/self/projects/:projectid/delete', authenticate.authenticate, projectController.deleteProject);

// Update a project of projectID
router.post('/self/projects/:projectid/update', authenticate.authenticate, projectController.updateProject);

export default router;
