// services/commentService.js
const {Comment} = require('../models');

// Only accept whitelisted fields in service methods
exports.createComment = async (data) => {
    const allowedFields = ['content', 'post_id', 'member_id'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Comment.create(filtered);
};

exports.getAllComments = async ({ where = {}, offset = 0, limit = 10 } = {}) => {
  // Only allow filtering by whitelisted fields
  const allowedFilters = ['post_id', 'member_id'];
  const filteredWhere = {};
  Object.keys(where).forEach(key => { if (allowedFilters.includes(key)) filteredWhere[key] = where[key]; });
  return await Comment.findAndCountAll({ where: filteredWhere, offset, limit });
};

exports.getCommentById = async (id) => {
    return await Comment.findByPk(id);
};

exports.updateComment = async (id, data) => {
    const comment = await Comment.findByPk(id);
    if (comment) {
        const allowedFields = ['content', 'post_id', 'member_id'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await comment.update(filtered);
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

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
// Best practice: Add audit logging for create/update/delete actions
