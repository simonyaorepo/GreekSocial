const express = require('express');
const router = express.Router();
const { messageController } = require('../controllers');

router.post('/', messageController.createMessage);
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);


module.exports = router;
