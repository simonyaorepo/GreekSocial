// __tests__/tagService.test.js
const tagService = require('../src/services/tagService');
const { Tag } = require('../src/models');

describe('Tag Service', () => {
  it('should create a tag', async () => {
    const tag = await tagService.createTag({ name: 'test', description: 'desc' });
    expect(tag).toHaveProperty('id');
    expect(tag.name).toBe('test');
  });
  it('should get all tags', async () => {
    const { rows } = await tagService.getAllTags();
    expect(Array.isArray(rows)).toBe(true);
  });
});
