// tagService.js
const { Tag, Chapter, Member, Organization, Post, Comment } = require('../models');

const tagService = {
  async createTag(data) {
    return Tag.create(data);
  },
  async getAllTags() {
    return Tag.findAll();
  },
  async getTagById(id) {
    return Tag.findByPk(id);
  },
  async updateTag(id, data) {
    return Tag.update(data, { where: { id } });
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
