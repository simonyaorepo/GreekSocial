const Chapter = require('../models/chapterModel');

exports.createChapter = async (req, res) => {
    try {
        const chapter = await Chapter.create(req.body);
        res.status(201).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChapters = async (req, res) => {
    try {
        const chapters = await Chapter.findAll();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
