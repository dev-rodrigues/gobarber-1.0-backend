import User from '../models/User';

class UserController {
    /**
     *  TODO:
     *  CRIAR MIDDLEWARE PARA VALIDAR EXISTENCIA DO USUARIO E TORNAR O METODO
     *  STORE MAIS ENXUTO
     */
    async store(req, res) {
        const user_exists = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user_exists) {
            return res.status(400).json({ error: 'User already existis' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const user_exists = await User.findOne({ where: { email } });

            if (user_exists) {
                return res.status(400).json({ error: 'User already existis' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }
}

export default new UserController();
