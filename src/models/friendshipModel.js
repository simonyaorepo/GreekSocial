const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./memberModel');

const Friendship = sequelize.define('Friendship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,  // References the 'id' column of the Member model
      key: 'id',
    },
    allowNull: false,
  },
  friend_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,  // References the 'id' column of the Member model
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',  // Default value for status
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
}, {
  tableName: 'friendship',  // Specify custom table name (optional)
  timestamps: false,  // Disable timestamps (as we're defining 'created_at' and 'updated_at' explicitly)
  underscored: true  // Use snake_case for column names (e.g., created_at instead of createdAt)
});

// Define associations with Member model
Friendship.associate = (models) => {
  Friendship.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
  Friendship.belongsTo(models.Member, { foreignKey: 'friend_id', as: 'friend' });
};

module.exports = Friendship;
