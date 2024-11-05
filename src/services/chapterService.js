// services/chapterService.js
const Chapter = require('../models/Chapter');

exports.createChapter = async (data) => {
    return await Chapter.create(data);
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
        return await chapter.update(data);
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
