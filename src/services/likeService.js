// services/likeService.js
const Like = require('../models/Like');

exports.createLike = async (data) => {
    return await Like.create(data);
};

exports.getAllLikes = async () => {
    return await Like.findAll();
};

exports.getLikeById = async (id) => {
    return await Like.findByPk(id);
};

exports.deleteLike = async (id) => {
    const like = await Like.findByPk(id);
    if (like) {
        await like.destroy();
        return true;
    }
    throw new Error('Like not found');
};
