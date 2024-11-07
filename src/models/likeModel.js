// models/like.js
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'likes',
      timestamps: false,
    });
  
    Like.associate = function(models) {
      Like.belongsTo(models.Post, { foreignKey: 'post_id' });
      Like.belongsTo(models.Member, { foreignKey: 'user_id' });
    };
  
    return Like;
  };
  