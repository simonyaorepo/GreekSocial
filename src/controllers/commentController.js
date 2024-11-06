const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
    try {
        const comment = await commentService.createCommentService(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllCommentsService();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await commentService.getCommentByIdService(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await commentService.updateCommentService(req.params.id, req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await commentService.deleteCommentService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
