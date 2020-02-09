import User from '../models/User';
/**
 * Deve verificar se o usuario logado é um provider
 * Se nao, retornar erro
 */
export default async (req, res, next) => {
    const userProvider = await User.findOne({
        where: {
            id: req.userId,
            provider: true
        }
    });

    if (!userProvider) {
        return res.status(401).json({ error: 'User is not provider' });
    }
    return next();
};
