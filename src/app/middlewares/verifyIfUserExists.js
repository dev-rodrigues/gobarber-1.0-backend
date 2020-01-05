import User from '../models/User';

/**
 * Deve receber o email do usuario no body da requisicao
 * Quando o usuario estiver tentando realizar acao
 * Entao consultar existencia do email no banco de dados
 * Se nao, retornar error
 */
export default async (req, res, next) => {
    const user_exists = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user_exists) {
        return res.status(400).json({ error: 'User already existis' });
    }
    return next();
};
