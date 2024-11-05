const express = require('express');
const router = express.Router();
const { organizationController } = require('../controllers');

router.post('/', organizationController.createOrganization);
router.get('/', organizationController.getOrganizations);
router.put('/:id', organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;
