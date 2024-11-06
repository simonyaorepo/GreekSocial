const eventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
    try {
        const event = await eventService.createEventService(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEventsService();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await eventService.getEventByIdService(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventService.updateEventService(req.params.id, req.body);
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await eventService.deleteEventService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
