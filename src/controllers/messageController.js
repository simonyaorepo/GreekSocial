const messageService = require('../services/messageService');

exports.createMessage = async (req, res, next) => {
  try {
    const message = await messageService.createMessageService(req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getAllMessagesService();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

exports.getMessageById = async (req, res, next) => {
  try {
    const message = await messageService.getMessageByIdService(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

exports.updateMessage = async (req, res, next) => {
  try {
    const updatedMessage = await messageService.updateMessageService(req.params.id, req.body);
    res.status(200).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    await messageService.deleteMessageService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
