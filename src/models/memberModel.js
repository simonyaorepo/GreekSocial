const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapterModel');
const Friendship = require('./friendshipModel');
const Post = require('./postModel');
const Message = require('./messageModel');
const Notification = require('./notificationModel');
const Role = require('./roleModel');
const RolePermission = require('./rolePermissionModel');
const Event = require('./eventModel');
const MemberAccount = require('./memberAccountModel'); // Linking to MemberAccount

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  join_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'member',
  timestamps: false,
});

// Associations
Member.associate = (models) => {
  Member.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
  Member.hasMany(models.Friendship, { foreignKey: 'member_id' });
  Member.hasMany(models.Friendship, { foreignKey: 'friend_id' });
  Member.hasMany(models.Post, { foreignKey: 'member_id' });
  Member.hasMany(models.Message, { foreignKey: 'sender_id' });
  Member.hasMany(models.Message, { foreignKey: 'receiver_id' });
  Member.hasMany(models.Notification, { foreignKey: 'user_id' });
  Member.hasMany(models.Event, { foreignKey: 'member_id' });

  // Many-to-many relationship with roles
  Member.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'member_id',
    as: 'roles',
  });

  // Linking to MemberAccount (one-to-one)
  Member.hasOne(models.MemberAccount, { foreignKey: 'member_id' });
};

module.exports = Member;
