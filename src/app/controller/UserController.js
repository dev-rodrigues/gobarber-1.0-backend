import User from '../models/User';

class UserController {
    /**
     *  TODO:
     *  CRIAR MIDDLE PARA VALIDAR EXISTENCIA DO USUARIO E TORNAR O METODO
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
        const user = await User.create(req.body);
        return res.json(user);
    }
}

export default new UserController();
