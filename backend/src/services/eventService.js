// services/eventService.js
const {Event} = require('../models');

// Only accept whitelisted fields in service methods
exports.createEvent = async (data) => {
    const allowedFields = ['event_name', 'event_date', 'description', 'visibility', 'chapter_id', 'organization_id'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Event.create(filtered);
};

exports.getAllEvents = async ({ where = {}, offset = 0, limit = 10 } = {}) => {
  // Only allow filtering by whitelisted fields
  const allowedFilters = ['chapter_id', 'organization_id'];
  const filteredWhere = {};
  Object.keys(where).forEach(key => { if (allowedFilters.includes(key)) filteredWhere[key] = where[key]; });
  return await Event.findAndCountAll({ where: filteredWhere, offset, limit });
};

exports.getEventById = async (id) => {
    return await Event.findByPk(id);
};

exports.updateEvent = async (id, data) => {
    const event = await Event.findByPk(id);
    if (event) {
        const allowedFields = ['event_name', 'event_date', 'description', 'visibility', 'chapter_id', 'organization_id'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await event.update(filtered);
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

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
