const express = require('express');
const router = express.Router();
const { likeController } = require('../controllers');

router.post('/', likeController.createLike);
router.get('/', likeController.getLikes);
router.put('/:id', likeController.updateLike);
router.delete('/:id', likeController.deleteLike);

module.exports = router;
