// services/postService.js
const {Post} = require('../models');

// Only accept whitelisted fields in service methods
exports.createPost = async (data) => {
    const allowedFields = ['content', 'member_id', 'chapter_id', 'organization_id', 'visibility'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Post.create(filtered);
};

exports.getAllPosts = async ({ where = {}, offset = 0, limit = 10 } = {}) => {
  // Only allow filtering by whitelisted fields
  const allowedFilters = ['member_id', 'chapter_id', 'organization_id'];
  const filteredWhere = {};
  Object.keys(where).forEach(key => { if (allowedFilters.includes(key)) filteredWhere[key] = where[key]; });
  return await Post.findAndCountAll({ where: filteredWhere, offset, limit });
};

exports.getPostById = async (id) => {
    return await Post.findByPk(id);
};

exports.updatePost = async (id, data) => {
    const post = await Post.findByPk(id);
    if (post) {
        const allowedFields = ['content', 'member_id', 'chapter_id', 'organization_id', 'visibility'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await post.update(filtered);
    }
    throw new Error('Post not found');
};

exports.deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if (post) {
        await post.destroy();
        return true;
    }
    throw new Error('Post not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
// Best practice: Add audit logging for create/update/delete actions
