import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';
import user_exists from './app/middlewares/verifyIfUserExists';
import user_valid_for_creation from './app/middlewares/validUserForCreation';
import valid_session from './app/middlewares/validCreateSession';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(
    '/users',
    user_valid_for_creation,
    user_exists,
    UserController.store
);

routes.post('/session', valid_session, SessionController.store);

routes.put('/users', authMiddleware, UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({
        ok: true
    });
});

export default routes;
