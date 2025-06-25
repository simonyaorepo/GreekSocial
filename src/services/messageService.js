// services/messageService.js
const {Message} = require('../models');

exports.createMessage = async (data) => {
    return await Message.create(data);
};

exports.getAllMessages = async () => {
    return await Message.findAll();
};

exports.getMessageById = async (id) => {
    return await Message.findByPk(id);
};

exports.updateMessage = async (id, data) => {
    const message = await Message.findByPk(id);
    if (message) {
        return await message.update(data);
    }
    throw new Error('Message not found');
};

exports.deleteMessage = async (id) => {
    const message = await Message.findByPk(id);
    if (message) {
        await message.destroy();
        return true;
    }
    throw new Error('Message not found');
};
