import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fail.' });
    }

    return next();
};
