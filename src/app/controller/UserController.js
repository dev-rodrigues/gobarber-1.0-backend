import User from '../models/User';

class UserController {
    async store(req, res) {
        // TODO
        // Criar middle para validar existencia do usuario
        const user_exists = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user_exists) {
            return res.status(400).json({ error: 'User already existis' });
        }
        const user = await User.create(req.body);
        return res.json(user);
    }
}

export default new UserController();
