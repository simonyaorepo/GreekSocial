const Member = require('../models/memberModel');

exports.createMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const member = await Member.update(req.body, { where: { id: req.params.id } });
        res.json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        await Member.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};