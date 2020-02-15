import Notification from '../../schemas/notification';

class NotificationController {
    async index(req, res) {
        const notifications = await Notification.find({
            user: req.userId
        })
            .sort({ createdAt: -1 })
            .limit(20);

        return res.json({ notifications });
    }

    async update(req, res) {
        // const notification = await Notification.findById(req.params.id);
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json({ notification });
    }
}

export default new NotificationController();
