exports.createComment = async (req, res, next) => {
    try {
      const comment = await commentService.createCommentService(req.body);
      res.status(201).json(comment);
    } catch (error) {
      next(error);  // Pass error to global error handler middleware
    }
  };
  
  exports.getAllComments = async (req, res, next) => {
    try {
      const comments = await commentService.getAllCommentsService();
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };
  
  exports.getCommentById = async (req, res, next) => {
    try {
      const comment = await commentService.getCommentByIdService(req.params.id);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };
  
  exports.updateComment = async (req, res, next) => {
    try {
      const updatedComment = await commentService.updateCommentService(req.params.id, req.body);
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteComment = async (req, res, next) => {
    try {
      await commentService.deleteCommentService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  };
  