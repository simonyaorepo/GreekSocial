const express = require('express');
const router = express.Router();
const { eventController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all event routes

router.post('/', eventController.createEvent); // TODO: add checkPermission('event:create')
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent); // TODO: add checkPermission('event:update')
router.delete('/:id', eventController.deleteEvent); // TODO: add checkPermission('event:delete')

// Best practice: Add Swagger docs and input validation at the route level
module.exports = router;
