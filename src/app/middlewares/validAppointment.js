import * as Yup from 'yup';

/**
 * Deve receber os dados de um appointment no body da requisicao
 * Quando o usuario estiver tentando realizar o cadastro de um appointment
 * Entao verificar se os dados foram passados no body
 * Se nao, retornar erro
 */
export default async (req, res, next) => {
    const schema = Yup.object({
        provider_id: Yup.number().required(),
        date: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fail.' });
    }
    return next();
};
