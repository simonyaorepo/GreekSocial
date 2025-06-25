const { Friendship } = require('../models');

exports.createFriendshipService = async (data) => {
  // Only allow whitelisted fields
  const allowedFields = ['member_id', 'friend_id', 'status'];
  const filtered = {};
  allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
  return Friendship.create(filtered);
};

exports.getAllFriendshipsService = async () => Friendship.findAll();

exports.deleteFriendshipService = async (id) => {
  // If paranoid: true, this will soft delete
  return Friendship.destroy({ where: { id } });
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for create/delete actions