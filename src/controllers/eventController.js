const eventService = require('../services/eventService');

exports.createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEventService(req.body);
        res.status(201).json(event);
    } catch (error) {
        next(error);  // Pass error to the global error handler
    }
};

exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEventsService();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

exports.getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventByIdService(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const updatedEvent = await eventService.updateEventService(req.params.id, req.body);
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        await eventService.deleteEventService(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
