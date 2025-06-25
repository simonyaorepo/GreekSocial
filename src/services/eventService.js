// services/eventService.js
const {Event} = require('../models');

exports.createEvent = async (data) => {
    return await Event.create(data);
};

exports.getAllEvents = async () => {
    return await Event.findAll();
};

exports.getEventById = async (id) => {
    return await Event.findByPk(id);
};

exports.updateEvent = async (id, data) => {
    const event = await Event.findByPk(id);
    if (event) {
        return await event.update(data);
    }
    throw new Error('Event not found');
};

exports.deleteEvent = async (id) => {
    const event = await Event.findByPk(id);
    if (event) {
        await event.destroy();
        return true;
    }
    throw new Error('Event not found');
};
