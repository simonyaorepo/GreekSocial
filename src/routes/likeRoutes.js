const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.createLike);
router.get('/', likeController.getLikes);

module.exports = router;
