import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

/**
 * Deve receber o Bearer token no headers da requisicao
 * Quando o usuario estiver logado
 * Entao adicionar o id do usuario no corpo da requisicao e retornar para
 *  proxima funcao
 * Se nao, retornar error
 */
export default async (req, res, next) => {
    const auth_header = req.headers.authorization;
    if (!auth_header) {
        return res.status(401).json({ error: 'Token not provider' });
    }
    const [, token] = auth_header.split(' ');

    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decode.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
