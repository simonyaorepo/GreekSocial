const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberAccountController');

router.post('/', controller.createMemberAccount);
router.get('/', controller.getAllMemberAccounts);
router.get('/:id', controller.getMemberAccountById);
router.put('/:id', controller.updateMemberAccount);
router.delete('/:id', controller.deleteMemberAccount);

module.exports = router;