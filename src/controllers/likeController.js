const likeService = require('../services/likeService');

exports.createLike = async (req, res, next) => {
  try {
    const like = await likeService.createLikeService(req.body);
    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};

exports.getAllLikes = async (req, res, next) => {
  try {
    const likes = await likeService.getAllLikesService();
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    await likeService.deleteLikeService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
