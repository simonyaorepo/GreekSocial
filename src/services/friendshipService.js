const { Friendship } = require('../models');

exports.createFriendshipService = async (data) => Friendship.create(data);
exports.getAllFriendshipsService = async () => Friendship.findAll();
exports.deleteFriendshipService = async (id) => Friendship.destroy({ where: { id } });