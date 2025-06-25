// memberAccountModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MemberAccount = sequelize.define('MemberAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  account_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'member_account',
  timestamps: true,
  underscored: true,
});

MemberAccount.associate = (models) => {
  MemberAccount.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
};

module.exports = MemberAccount;
