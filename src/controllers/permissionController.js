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

exports.updatePermission = async (req, res) => {
    try {
        const permission = await Permission.update(req.body, { where: { id: req.params.id } });
        res.json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePermission = async (req, res) => {
    try {
        await Permission.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};