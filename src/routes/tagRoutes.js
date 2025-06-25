// tagRoutes.js
const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// CRUD
router.post('/', tagController.create);
router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.delete);

// Assignment
router.post('/assign', tagController.assignTag); // { entity, entityId, tagId }
router.post('/remove', tagController.removeTag); // { entity, entityId, tagId }
router.get('/:entity/:entityId/tags', tagController.getTagsFor);

module.exports = router;
