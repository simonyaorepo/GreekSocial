// services/notificationService.js
const {Notification} = require('../models');

exports.createNotification = async (data) => {
    return await Notification.create(data);
};

exports.getAllNotifications = async () => {
    return await Notification.findAll();
};

exports.getNotificationById = async (id) => {
    return await Notification.findByPk(id);
};

exports.updateNotification = async (id, data) => {
    const notification = await Notification.findByPk(id);
    if (notification) {
        return await notification.update(data);
    }
    throw new Error('Notification not found');
};

exports.deleteNotification = async (id) => {
    const notification = await Notification.findByPk(id);
    if (notification) {
        await notification.destroy();
        return true;
    }
    throw new Error('Notification not found');
};
