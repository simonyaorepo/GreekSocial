const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.update(req.body, { where: { id: req.params.id } });
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

xports.deleteComment = async (req, res) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};