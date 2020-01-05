import Router from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.put('/users', UserController.update);

export default routes;
