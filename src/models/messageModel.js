// models/message.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'messages',
      timestamps: false,
    });
  
    Message.associate = function(models) {
      Message.belongsTo(models.Member, { foreignKey: 'sender_id' });
      Message.belongsTo(models.Member, { foreignKey: 'receiver_id' });
    };
  
    return Message;
  };
  