import * as Yup from 'yup';

/**
 * Deve receber o dados do usuario no body da requisicao
 * Quando o usuario estiver tentando realizar atualizacao dos dados
 * Entao validar os campos
 */
export default async (req, res, next) => {
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
    return next();
};
