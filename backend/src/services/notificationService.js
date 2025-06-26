// services/notificationService.js
const {Notification} = require('../models');

exports.createNotification = async (data) => {
    // Only allow whitelisted fields
    const allowedFields = ['user_id', 'message', 'is_read', 'chapter_id', 'organization_id'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Notification.create(filtered);
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
        // Only allow whitelisted fields
        const allowedFields = ['user_id', 'message', 'is_read', 'chapter_id', 'organization_id'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await notification.update(filtered);
    }
    throw new Error('Notification not found');
};

exports.deleteNotification = async (id) => {
    const notification = await Notification.findByPk(id);
    if (notification) {
        // If paranoid: true, this will soft delete
        await notification.destroy();
        return true;
    }
    throw new Error('Notification not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for create/update/delete actions
