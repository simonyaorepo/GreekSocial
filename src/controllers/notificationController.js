const notificationService = require('../services/notificationService');

exports.createNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.createNotificationService(req.body);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getAllNotificationsService();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.getNotificationById = async (req, res, next) => {
  try {
    const notification = await notificationService.getNotificationByIdService(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const updatedNotification = await notificationService.updateNotificationService(req.params.id, req.body);
    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await notificationService.deleteNotificationService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
