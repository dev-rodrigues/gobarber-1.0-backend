import User from '../models/User';

/**
 * Deve receber o provider_id no body da requisicao
 * Quando o usuario estiver tentando realizar o cadastro de um appointment
 * Entao consultar existencia do provider_id no banco de dados
 * Se nao, retornar error
 */
export default async (req, res, next) => {
    const isProvider = await User.findOne({
        where: { id: req.body.provider_id, provider: true }
    });

    if (!isProvider) {
        return res.status(401).json({
            message: 'You can only create appointments with providers'
        });
    }

    return next();
};
