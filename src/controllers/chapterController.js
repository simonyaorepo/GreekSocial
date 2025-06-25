const { body, validationResult, param, query } = require('express-validator');
const chapterService = require('../services/chapterService');
const chapterAccountService = require('../services/chapterAccountService');
// Best practice: Add authentication and permission middleware to protect sensitive routes
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');

// Field whitelisting helper to prevent unwanted fields
const whitelistFields = (body, allowedFields) => {
  const filtered = {};
  allowedFields.forEach(field => {
    if (body[field] !== undefined) filtered[field] = body[field];
  });
  return filtered;
};

const validateChapter = [
  body('name').isString().notEmpty().withMessage('Chapter name is required'),
  body('organization_id').isInt({ min: 1 }).withMessage('organization_id is required and must be a positive integer'),
  // Add more fields as needed
  (req, res, next) => {
    const allowedFields = ['name', 'organization_id', 'account'];
    Object.keys(req.body).forEach(key => {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({ errors: [{ msg: `Unexpected field: ${key}` }] });
      }
    });
    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateChapterId = [
  param('id').isInt({ min: 1 }).withMessage('Chapter ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createChapter = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('chapter:create'),
  ...validateChapter,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'organization_id'];
      const chapterData = whitelistFields(req.body, allowedFields);
      const chapter = await chapterService.createChapterService(chapterData);
      if (req.body.account) {
        const accountData = { chapter_id: chapter.id, ...req.body.account };
        await chapterAccountService.createChapterAccountService(accountData);
      }
      res.status(201).json(chapter);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllChapters = async (req, res, next) => {
  try {
    const chapters = await chapterService.getAllChaptersService();
    res.status(200).json(chapters);
  } catch (error) {
    next(error);
  }
};

exports.getChapterById = [
  ...validateChapterId,
  async (req, res, next) => {
    try {
      const chapter = await chapterService.getChapterByIdService(req.params.id);
      if (!chapter) return res.status(404).json({ message: "Chapter not found" });
      res.status(200).json(chapter);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateChapter = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('chapter:update'),
  ...validateChapterId,
  ...validateChapter,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'organization_id'];
      const chapterData = whitelistFields(req.body, allowedFields);
      const updatedChapter = await chapterService.updateChapterService(req.params.id, chapterData);
      if (req.body.account) {
        await chapterAccountService.updateChapterAccountServiceByChapterId(req.params.id, req.body.account);
      }
      res.status(200).json(updatedChapter);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteChapter = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('chapter:delete'),
  ...validateChapterId,
  async (req, res, next) => {
    try {
      await chapterAccountService.deleteChapterAccountServiceByChapterId(req.params.id);
      await chapterService.deleteChapterService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
