const likeService = require('../services/likeService');

exports.createLike = async (req, res) => {
    try {
        const like = await likeService.createLikeService(req.body);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllLikes = async (req, res) => {
    try {
        const likes = await likeService.getAllLikesService();
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        await likeService.deleteLikeService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
