module.exports = (sequelize) => {
    class Post extends Model {}
    Post.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        }
    }, { sequelize, modelName: 'post' });

    return Post;
};
