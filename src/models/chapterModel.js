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
});

Chapter.associate = (models) => {
  Chapter.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Chapter.hasMany(models.Post, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Event, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Notification, { foreignKey: 'chapter_id' });

  Chapter.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'chapter_id',
    as: 'roles',
  });

  Chapter.hasOne(models.ChapterAccount, { foreignKey: 'chapter_id' });
};

module.exports = Chapter;
