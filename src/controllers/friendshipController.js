const friendshipService = require('../services/friendshipService');

exports.createFriendship = async (req, res) => {
  try {
    const friendship = await friendshipService.createFriendshipService(req.body);
    res.status(201).json(friendship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllFriendships = async (req, res) => {
  try {
    const friendships = await friendshipService.getAllFriendshipsService();
    res.status(200).json(friendships);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFriendship = async (req, res) => {
  try {
    await friendshipService.deleteFriendshipService(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};