const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./member');

const MemberAccount = sequelize.define('MemberAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'member_accounts',
  timestamps: false,
});

MemberAccount.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = MemberAccount;
