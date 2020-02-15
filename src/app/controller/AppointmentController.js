import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../../schemas/notification';
import mail from '../lib/mail';

class AppointmentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }
            ]
        });
        return res.json({ appointments });
    }

    async store(req, res) {
        const { provider_id, date } = req.body;

        /**
         * verificando hora passada
         */
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past date are not permitted' });
        }

        /**
         * verificando agendamento duplicado
         */
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Appointment date is not available' });
        }

        /**
         * criando appointment
         */
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart
        });

        /**
         * buscando dados do usuario
         */
        const user = await User.findByPk(req.userId);

        /**
         * formatando data
         */
        const dataFormatada = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );

        /**
         * notificar prestador de servico
         */
        await Notification.create({
            content: `Novo Agendamento de ${user.name} para ${dataFormatada}`,
            user: provider_id
        });

        return res.json({ appointment });
    }

    // eslint-disable-next-line consistent-return
    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: {
                model: User,
                as: 'provider',
                attributes: ['name', 'provider']
            }
        });

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                error: 'Voce nao tem permissao para apagar esse agendamento.'
            });
        }

        const dateWithSub = subHours(appointment.date, 2);
        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error: 'Voce pode cancelar um agendamente até duas horas antes.'
            });
        }

        appointment.canceled_at = new Date();
        await appointment.save();

        await mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            text: 'Voce tem um novo cancelamento'
        });

        res.json({ appointment });
    }
}

export default new AppointmentController();
