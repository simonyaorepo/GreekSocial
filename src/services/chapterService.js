// services/chapterService.js
const {Chapter} = require('../models');

// Only accept whitelisted fields in service methods
exports.createChapter = async (data) => {
    const allowedFields = ['organization_id', 'location', 'founded_date'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Chapter.create(filtered);
};

exports.getAllChapters = async () => {
    return await Chapter.findAll();
};

exports.getChapterById = async (id) => {
    return await Chapter.findByPk(id);
};

exports.updateChapter = async (id, data) => {
    const chapter = await Chapter.findByPk(id);
    if (chapter) {
        const allowedFields = ['organization_id', 'location', 'founded_date'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await chapter.update(filtered);
    }
    throw new Error('Chapter not found');
};

exports.deleteChapter = async (id) => {
    const chapter = await Chapter.findByPk(id);
    if (chapter) {
        await chapter.destroy();
        return true;
    }
    throw new Error('Chapter not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
// Best practice: Add audit logging for create/update/delete actions
