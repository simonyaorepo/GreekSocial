const Like = require('../models/likeModel');

exports.createLike = async (req, res) => {
    try {
        const like = await Like.create(req.body);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.findAll();
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
