import * as Yup from 'yup';

export default async (req, res, next) => {
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

    return next();
};
