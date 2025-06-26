// tagService.js
const { Tag, ChapterAccount, MemberAccount, OrganizationAccount, Post, Comment } = require('../models');

exports.createTag = async (data) => {
  // Best practice: Whitelist allowed fields to prevent unwanted data processing
  const allowedFields = ['name', 'description'];
  const filtered = {};
  allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
  return Tag.create(filtered);
};

exports.getAllTags = async ({ where = {}, offset = 0, limit = 10 } = {}) => {
  // Only allow filtering by whitelisted fields
  const allowedFilters = ['name'];
  const filteredWhere = {};
  Object.keys(where).forEach(key => { if (allowedFilters.includes(key)) filteredWhere[key] = where[key]; });
  return Tag.findAndCountAll({ where: filteredWhere, offset, limit });
};

exports.getTagById = async (id) => Tag.findByPk(id);

exports.updateTag = async (id, data) => {
  // Best practice: Whitelist allowed fields to prevent unwanted data processing
  const allowedFields = ['name', 'description'];
  const filtered = {};
  allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
  return Tag.update(filtered, { where: { id } });
};

exports.deleteTag = async (id) => Tag.destroy({ where: { id } });

exports.assignTagTo = async (entity, entityId, tagId) => {
  const model = getModel(entity);
  const instance = await model.findByPk(entityId);
  const tag = await Tag.findByPk(tagId);
  if (instance && tag && instance.addTag) {
    await instance.addTag(tag);
    return true;
  }
  return false;
};

exports.removeTagFrom = async (entity, entityId, tagId) => {
  const model = getModel(entity);
  const instance = await model.findByPk(entityId);
  const tag = await Tag.findByPk(tagId);
  if (instance && tag && instance.removeTag) {
    await instance.removeTag(tag);
    return true;
  }
  return false;
};

exports.getTagsFor = async (entity, entityId) => {
  const model = getModel(entity);
  const instance = await model.findByPk(entityId, { include: ['tags'] });
  return instance ? instance.tags : [];
};

function getModel(entity) {
  switch (entity) {
    case 'chapter': return ChapterAccount;
    case 'member': return MemberAccount;
    case 'organization': return OrganizationAccount;
    case 'post': return Post;
    case 'comment': return Comment;
    default: throw new Error('Invalid entity for tagging');
  }
}

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
