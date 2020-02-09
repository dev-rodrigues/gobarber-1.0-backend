import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import FileController from './app/controller/FileController';
import ProviderController from './app/controller/ProviderController';
import AppointmentController from './app/controller/AppointmentController';
import ScheduleController from './app/controller/ScheduleController';

import authMiddleware from './app/middlewares/auth';
import user_exists from './app/middlewares/verifyIfUserExists';
import user_valid_for_creation from './app/middlewares/validUserForCreation';
import valid_session from './app/middlewares/validCreateSession';
import valid_appointment from './app/middlewares/validAppointment';
import valid_userId_for_appointment from './app/middlewares/validUserForAppointment';
import userProvider from './app/middlewares/userProvider';

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

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', authMiddleware, ProviderController.index);

routes.post(
    '/appointment',
    authMiddleware,
    valid_appointment,
    valid_userId_for_appointment,
    AppointmentController.store
);

routes.get('/appointment', authMiddleware, AppointmentController.index);

routes.get('/schedule', authMiddleware, userProvider, ScheduleController.index);

export default routes;
