import Router from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';
import user_exists from './app/middlewares/verifyIfUserExists';

const routes = new Router();

routes.post('/users', user_exists, UserController.store);
routes.post('/session', SessionController.store);

routes.put('/users', authMiddleware, UserController.update);

export default routes;
