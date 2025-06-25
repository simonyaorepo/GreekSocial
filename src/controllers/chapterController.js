const chapterService = require('../services/chapterService');
const chapterAccountService = require('../services/chapterAccountService');

exports.createChapter = async (req, res) => {
  try {
    // Create chapter first
    const chapter = await chapterService.createChapterService(req.body);

    // Automatically create associated ChapterAccount with chapter_id
    const accountData = { chapter_id: chapter.id, ...req.body.account };
    await chapterAccountService.createChapterAccountService(accountData);

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
    // Update chapter data
    const updatedChapter = await chapterService.updateChapterService(req.params.id, req.body);

    // Update associated ChapterAccount if account data provided
    if (req.body.account) {
      await chapterAccountService.updateChapterAccountServiceByChapterId(req.params.id, req.body.account);
    }

    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    // Delete chapter account first (cascading)
    await chapterAccountService.deleteChapterAccountServiceByChapterId(req.params.id);

    // Delete chapter
    await chapterService.deleteChapterService(req.params.id);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
