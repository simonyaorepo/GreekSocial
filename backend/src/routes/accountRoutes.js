const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Unified Account CRUD
router.post('/', accountController.createAccount);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

// Optionally, add endpoints for login, role/permission assignment, etc.
// router.post('/login', accountController.login);
// router.post('/:id/roles', accountController.assignRole);
// router.post('/:id/permissions', accountController.assignPermission);

module.exports = router;
