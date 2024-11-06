const messageService = require('../services/messageService');

exports.createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessageService(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getAllMessagesService();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await messageService.getMessageByIdService(req.params.id);
        if (!message) return res.status(404).json({ message: "Message not found" });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await messageService.updateMessageService(req.params.id, req.body);
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await messageService.deleteMessageService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
