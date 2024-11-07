const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./memberModel');

const MemberAccount = sequelize.define('MemberAccount', {
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
    unique: true,  // Ensure the email is unique
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'member_account',  // Specify custom table name (optional)
  timestamps: false,  // Disable default Sequelize timestamps
  underscored: true
});

// Define associations with the Member model
MemberAccount.associate = (models) => {
  MemberAccount.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
};

module.exports = MemberAccount;
