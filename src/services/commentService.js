// services/commentService.js
const {Comment} = require('../models');

exports.createComment = async (data) => {
    return await Comment.create(data);
};

exports.getAllComments = async () => {
    return await Comment.findAll();
};

exports.getCommentById = async (id) => {
    return await Comment.findByPk(id);
};

exports.updateComment = async (id, data) => {
    const comment = await Comment.findByPk(id);
    if (comment) {
        return await comment.update(data);
    }
    throw new Error('Comment not found');
};

exports.deleteComment = async (id) => {
    const comment = await Comment.findByPk(id);
    if (comment) {
        await comment.destroy();
        return true;
    }
    throw new Error('Comment not found');
};
