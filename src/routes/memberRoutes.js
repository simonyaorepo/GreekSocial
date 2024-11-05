const express = require('express');
const router = express.Router();
const { memberController } = require('../controllers');

router.post('/', memberController.createMember);
router.get('/', memberController.getMembers);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
