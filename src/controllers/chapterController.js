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

exports.updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.update(req.body, { where: { id: req.params.id } });
        res.json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        await Chapter.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};