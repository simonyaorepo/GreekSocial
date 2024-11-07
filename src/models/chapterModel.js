const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');
const RolePermission = require('./rolePermissionModel');
const Post = require('./postModel');
const Event = require('./eventModel');
const Notification = require('./notificationModel');
const Organization = require('./organizationModel');
const ChapterAccount = require('./chapterAccountModel'); // Linking to ChapterAccount

const Chapter = sequelize.define('Chapter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'chapter',
  timestamps: false,
});

// Associations
Chapter.associate = (models) => {
  Chapter.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Chapter.hasMany(models.Post, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Event, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Notification, { foreignKey: 'user_id' });

  // Many-to-many relationship with roles
  Chapter.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'chapter_id',
    as: 'roles',
  });

  // Linking to ChapterAccount (one-to-one)
  Chapter.hasOne(models.ChapterAccount, { foreignKey: 'chapter_id' });
};

module.exports = Chapter;
