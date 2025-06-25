const postService = require('../services/postService');

exports.createPost = async (req, res, next) => {
  try {
    const post = await postService.createPostService(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostByIdService(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await postService.updatePostService(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await postService.deletePostService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
