// models/post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organization_id: {
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
      updated_at: {
        type: DataTypes.DATE,
      },
      visibility: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },
    }, {
      tableName: 'posts',
      timestamps: false,
    });
  
    Post.associate = function(models) {
      Post.belongsTo(models.Member, { foreignKey: 'member_id' });
      Post.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
      Post.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    };
  
    return Post;
  };
  