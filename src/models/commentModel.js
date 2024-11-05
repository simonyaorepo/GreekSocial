module.exports = (sequelize) => {
    class Comment extends Model {}
    Comment.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            references: { model: 'posts', key: 'id' }
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        }
    }, { sequelize, modelName: 'comment' });

    return Comment;
};
