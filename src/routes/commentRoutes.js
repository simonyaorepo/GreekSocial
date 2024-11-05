const express = require('express');
const router = express.Router();
const { commentController } = require('../controllers');

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
