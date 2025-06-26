// shareModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Share = sequelize.define('Share', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'post', key: 'id' },
    onDelete: 'CASCADE',
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'event', key: 'id' },
    onDelete: 'CASCADE',
  },
  shared_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'share',
  timestamps: false,
  underscored: true,
});

Share.associate = (models) => {
  Share.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  Share.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  Share.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
};

module.exports = Share;
