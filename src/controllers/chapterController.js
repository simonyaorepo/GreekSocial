const chapterService = require('../services/chapterService');

exports.createChapter = async (req, res, next) => {
  try {
    const chapter = await chapterService.createChapterService(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    next(error);  // Pass error to global error handler
  }
};

exports.getAllChapters = async (req, res, next) => {
  try {
    const chapters = await chapterService.getAllChaptersService();
    res.status(200).json(chapters);
  } catch (error) {
    next(error);
  }
};

exports.getChapterById = async (req, res, next) => {
  try {
    const chapter = await chapterService.getChapterByIdService(req.params.id);
    if (!chapter) {
      res.status(404);
      return next(new Error('Chapter not found'));
    }
    res.status(200).json(chapter);
  } catch (error) {
    next(error);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const updatedChapter = await chapterService.updateChapterService(req.params.id, req.body);
    res.status(200).json(updatedChapter);
  } catch (error) {
    next(error);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    await chapterService.deleteChapterService(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
