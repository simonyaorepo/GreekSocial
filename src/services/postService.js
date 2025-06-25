// services/postService.js
const {Post} = require('../models');

exports.createPost = async (data) => {
    return await Post.create(data);
};

exports.getAllPosts = async () => {
    return await Post.findAll();
};

exports.getPostById = async (id) => {
    return await Post.findByPk(id);
};

exports.updatePost = async (id, data) => {
    const post = await Post.findByPk(id);
    if (post) {
        return await post.update(data);
    }
    throw new Error('Post not found');
};

exports.deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if (post) {
        await post.destroy();
        return true;
    }
    throw new Error('Post not found');
};
