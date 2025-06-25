// tagController.js
const tagService = require('../services/tagService');

const tagController = {
  async create(req, res) {
    const tag = await tagService.createTag(req.body);
    res.json(tag);
  },
  async getAll(req, res) {
    const tags = await tagService.getAllTags();
    res.json(tags);
  },
  async getById(req, res) {
    const tag = await tagService.getTagById(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json(tag);
  },
  async update(req, res) {
    await tagService.updateTag(req.params.id, req.body);
    res.json({ success: true });
  },
  async delete(req, res) {
    await tagService.deleteTag(req.params.id);
    res.json({ success: true });
  },
  // Assignment endpoints
  async assignTag(req, res) {
    const { entity, entityId, tagId } = req.body;
    const ok = await tagService.assignTagTo(entity, entityId, tagId);
    if (!ok) return res.status(400).json({ error: 'Assignment failed' });
    res.json({ success: true });
  },
  async removeTag(req, res) {
    const { entity, entityId, tagId } = req.body;
    const ok = await tagService.removeTagFrom(entity, entityId, tagId);
    if (!ok) return res.status(400).json({ error: 'Removal failed' });
    res.json({ success: true });
  },
  async getTagsFor(req, res) {
    const { entity, entityId } = req.params;
    const tags = await tagService.getTagsFor(entity, entityId);
    res.json(tags);
  },
};

module.exports = tagController;
