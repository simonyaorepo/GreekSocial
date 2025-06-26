// tagService.js
const { Tag, Chapter, Member, Organization, Post, Comment } = require('../models');

const tagService = {
  async createTag(data) {
    // Best practice: Whitelist allowed fields to prevent unwanted data processing
    const allowedFields = ['name', 'description'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return Tag.create(filtered);
  },
  async getAllTags({ where = {}, offset = 0, limit = 10 } = {}) {
    // Only allow filtering by whitelisted fields
    const allowedFilters = ['name'];
    const filteredWhere = {};
    Object.keys(where).forEach(key => { if (allowedFilters.includes(key)) filteredWhere[key] = where[key]; });
    return Tag.findAndCountAll({ where: filteredWhere, offset, limit });
  },
  async getTagById(id) {
    return Tag.findByPk(id);
  },
  async updateTag(id, data) {
    // Best practice: Whitelist allowed fields to prevent unwanted data processing
    const allowedFields = ['name', 'description'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return Tag.update(filtered, { where: { id } });
  },
  async deleteTag(id) {
    return Tag.destroy({ where: { id } });
  },
  // Assignment helpers
  async assignTagTo(entity, entityId, tagId) {
    const model = getModel(entity);
    const instance = await model.findByPk(entityId);
    const tag = await Tag.findByPk(tagId);
    if (instance && tag) {
      await instance.addTag(tag);
      return true;
    }
    return false;
  },
  async removeTagFrom(entity, entityId, tagId) {
    const model = getModel(entity);
    const instance = await model.findByPk(entityId);
    const tag = await Tag.findByPk(tagId);
    if (instance && tag) {
      await instance.removeTag(tag);
      return true;
    }
    return false;
  },
  async getTagsFor(entity, entityId) {
    const model = getModel(entity);
    const instance = await model.findByPk(entityId, { include: ['tags'] });
    return instance ? instance.tags : [];
  },
};

function getModel(entity) {
  switch (entity) {
    case 'chapter': return Chapter;
    case 'member': return Member;
    case 'organization': return Organization;
    case 'post': return Post;
    case 'comment': return Comment;
    default: throw new Error('Invalid entity for tagging');
  }
}

module.exports = tagService;

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
