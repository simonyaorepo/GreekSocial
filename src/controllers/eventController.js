const { body, validationResult, param, query } = require('express-validator');
const eventService = require('../services/eventService');

// Validation middleware for event creation and update
const validateEvent = [
  body('event_name').isString().notEmpty().withMessage('Event name is required'),
  body('event_date').isISO8601().withMessage('Event date must be a valid date'),
  body('description').optional().isString(),
  body('visibility').optional().isIn(['public', 'private']),
  // Only allow whitelisted fields
  (req, res, next) => {
    const allowedFields = ['event_name', 'event_date', 'description', 'visibility', 'chapter_id', 'organization_id'];
    Object.keys(req.body).forEach(key => {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({ errors: [{ msg: `Unexpected field: ${key}` }] });
      }
    });
    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for event id param
const validateEventId = [
  param('id').isInt({ min: 1 }).withMessage('Event ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for pagination and filter queries
const validateEventQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be 1-100'),
  query('chapter_id').optional().isInt({ min: 1 }).withMessage('chapter_id must be a positive integer'),
  query('organization_id').optional().isInt({ min: 1 }).withMessage('organization_id must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Best practice: Add authentication and permission middleware to protect sensitive routes
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');

// Field whitelisting helper to prevent unwanted fields
const whitelistFields = (body, allowedFields) => {
  const filtered = {};
  allowedFields.forEach(field => {
    if (body[field] !== undefined) filtered[field] = body[field];
  });
  return filtered;
};

exports.createEvent = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('event:create'),
  ...validateEvent,
  async (req, res, next) => {
    try {
      // Only allow whitelisted fields
      const allowedFields = ['event_name', 'event_date', 'description', 'visibility', 'chapter_id', 'organization_id'];
      const eventData = whitelistFields(req.body, allowedFields);
      const event = await eventService.createEventService(eventData);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllEvents = [
  // TODO: Add authentication, permission, and rate limiting middleware here
  // authenticateJWT, checkPermission('event:read'), rateLimiter,
  ...validateEventQuery,
  async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;
        const where = {};
        if (req.query.chapter_id) where.chapter_id = req.query.chapter_id;
        if (req.query.organization_id) where.organization_id = req.query.organization_id;
        const { rows, count } = await eventService.getAllEvents({ where, offset, limit: pageSize });
        // Only return non-deleted events if paranoid is enabled
        // Sequelize handles this automatically if paranoid: true
        res.json({ data: rows, total: count, page, pageSize });
    } catch (error) {
        next(error);
    }
  }
];

exports.getEventById = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('event:read'),
  ...validateEventId,
  async (req, res, next) => {
    try {
        const event = await eventService.getEventByIdService(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
  }
];

exports.updateEvent = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('event:update'),
  ...validateEventId,
  ...validateEvent,
  async (req, res, next) => {
    try {
        const allowedFields = ['event_name', 'event_date', 'description', 'visibility', 'chapter_id', 'organization_id'];
        const eventData = whitelistFields(req.body, allowedFields);
        const updatedEvent = await eventService.updateEventService(req.params.id, eventData);
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
  }
];

exports.deleteEvent = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('event:delete'),
  ...validateEventId,
  async (req, res, next) => {
    try {
        await eventService.deleteEventService(req.params.id);
        // If using soft deletes, consider returning 200 with a message
        res.status(200).json({ message: 'Event deleted (soft delete if enabled).' });
    } catch (error) {
        next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
// Best practice: Add audit logging for create/update/delete actions
// Reminder: Document this controller's endpoints in Swagger/OpenAPI
