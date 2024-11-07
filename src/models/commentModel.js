// models/comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'comments',
      timestamps: false,
    });
  
    Comment.associate = function(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
      Comment.belongsTo(models.Member, { foreignKey: 'user_id' });
    };
  
    return Comment;
  };
  