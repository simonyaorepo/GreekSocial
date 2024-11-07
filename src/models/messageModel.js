const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./memberModel');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Message.associate = (models) => {
  Message.belongsTo(models.Member, { foreignKey: 'sender_id', as: 'sender' });
  Message.belongsTo(models.Member, { foreignKey: 'receiver_id', as: 'receiver' });
};

module.exports = Message;
