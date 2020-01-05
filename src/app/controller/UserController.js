import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    /**
     * TODO:
     * CRIAR MIDDLEWARE PARA VALIDAR INPUT DO USUARIO
     */
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string()
                .required()
                .min(6)
                .max(12)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail.' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    /**
     * TODO:
     * Verificar se novo email está sendo utilizado
     */

    /**
     * TODO:
     * CRIAR MIDDLEWARE PARA VALIDAR INPUT DO USUARIO
     */
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string()
                .min(6)
                .max(12),
            password: Yup.string()
                .min(6)
                .max(12)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail.' });
        }

        // dados básicos
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const user_exists = await User.findOne({ where: { email } });

            if (user_exists) {
                return res.status(400).json({ error: 'User already existis' });
            }
        }

        // dados opcionais
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
