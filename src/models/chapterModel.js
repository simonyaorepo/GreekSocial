// chapterModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Chapter = sequelize.define('Chapter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'organization', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'chapter',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

// Advanced/Custom Associations
Chapter.associate = (models) => {
  Chapter.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Chapter.hasMany(models.Member, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Post, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Event, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Notification, { foreignKey: 'chapter_id' });
  Chapter.hasOne(models.ChapterAccount, { foreignKey: 'chapter_id' });

  // Tagging: Many-to-many with Tag
  if (models.Tag) {
    Chapter.belongsToMany(models.Tag, {
      through: 'ChapterTag',
      foreignKey: 'chapter_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  }

  // Mentions: Many-to-many with Post/Event via ChapterMention
  if (models.Post && models.ChapterMention) {
    Chapter.belongsToMany(models.Post, {
      through: models.ChapterMention,
      foreignKey: 'chapter_id',
      otherKey: 'post_id',
      as: 'mentionedInPosts',
    });
  }
  if (models.Event && models.ChapterMention) {
    Chapter.belongsToMany(models.Event, {
      through: models.ChapterMention,
      foreignKey: 'chapter_id',
      otherKey: 'event_id',
      as: 'mentionedInEvents',
    });
  }

  // Direct permissions: Many-to-many with Permission
  if (models.Permission) {
    Chapter.belongsToMany(models.Permission, {
      through: 'ChapterPermission',
      foreignKey: 'chapter_id',
      otherKey: 'permission_id',
      as: 'directPermissions',
    });
  }
};

// Example static method: Get all tags for a chapter
Chapter.getTags = async function (chapterId) {
  const chapter = await this.findByPk(chapterId, { include: ['tags'] });
  return chapter ? chapter.tags : [];
};

// Example static method for permission check
Chapter.hasPermission = async function(chapterId, permissionName, models) {
  const chapter = await this.findByPk(chapterId, {
    include: [{
      model: models.Permission,
      as: 'directPermissions',
      where: { name: permissionName },
      required: false,
    }],
  });
  return chapter && chapter.directPermissions && chapter.directPermissions.length > 0;
};

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Chapter;
