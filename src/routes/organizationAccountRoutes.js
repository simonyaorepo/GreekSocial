const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationAccountController');

router.post('/', controller.createOrganizationAccount);
router.get('/', controller.getAllOrganizationAccounts);
router.get('/:id', controller.getOrganizationAccountById);
router.put('/:id', controller.updateOrganizationAccount);
router.delete('/:id', controller.deleteOrganizationAccount);

module.exports = router;