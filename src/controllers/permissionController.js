const Permission = require('../models/permissionModel');

exports.createPermission = async (req, res) => {
    try {
        const permission = await Permission.create(req.body);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
