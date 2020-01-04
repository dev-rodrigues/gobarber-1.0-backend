import Router from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Carlos',
        email: 'carlos.hrq@gmail.com',
        password_hash: '12345werwerwe'
    });
    return res.json(user);
});

export default routes;
