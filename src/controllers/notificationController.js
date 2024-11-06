const notificationService = require('../services/notificationService');

exports.createNotification = async (req, res) => {
    try {
        const notification = await notificationService.createNotificationService(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotificationsService();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationByIdService(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const updatedNotification = await notificationService.updateNotificationService(req.params.id, req.body);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        await notificationService.deleteNotificationService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
