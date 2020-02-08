import * as Yup from 'yup';
import Appointment from '../models/Appointment';

class AppointmentController {
    async store(req, res) {
        const schema = Yup.object({
            provider_id: Yup.number().required(),
            date: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail.' });
        }

        const { provider_id, date } = req.body;

        const appointment = await Appointment.create({
            user_id: req.user_id,
            provider_id,
            date
        });
        return res.json({ appointment });
    }
}

export default new AppointmentController();
