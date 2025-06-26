// services/messageService.js
const {Message} = require('../models');

exports.createMessage = async (data) => {
    // Only allow whitelisted fields
    const allowedFields = ['sender_id', 'receiver_id', 'content'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Message.create(filtered);
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
        // Only allow whitelisted fields
        const allowedFields = ['sender_id', 'receiver_id', 'content'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await message.update(filtered);
    }
    throw new Error('Message not found');
};

exports.deleteMessage = async (id) => {
    const message = await Message.findByPk(id);
    if (message) {
        // If paranoid: true, this will soft delete
        await message.destroy();
        return true;
    }
    throw new Error('Message not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for create/update/delete actions
