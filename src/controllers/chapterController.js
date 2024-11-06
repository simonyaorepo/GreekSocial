const chapterService = require('../services/chapterService');

exports.createChapter = async (req, res) => {
    try {
        const chapter = await chapterService.createChapterService(req.body);
        res.status(201).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await chapterService.getAllChaptersService();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChapterById = async (req, res) => {
    try {
        const chapter = await chapterService.getChapterByIdService(req.params.id);
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateChapter = async (req, res) => {
    try {
        const updatedChapter = await chapterService.updateChapterService(req.params.id, req.body);
        res.status(200).json(updatedChapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        await chapterService.deleteChapterService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
