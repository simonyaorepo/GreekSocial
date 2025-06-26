// messageModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member_account', key: 'account_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member_account', key: 'account_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unread',
  },
}, {
  tableName: 'message',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

Message.associate = (models) => {
  Message.belongsTo(models.MemberAccount, { foreignKey: 'sender_id', as: 'sender' });
  Message.belongsTo(models.MemberAccount, { foreignKey: 'receiver_id', as: 'receiver' });
};

module.exports = Message;
