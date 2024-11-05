module.exports = (sequelize) => {
    class Like extends Model {}
    Like.init({
        postId: {
            type: DataTypes.INTEGER,
            references: { model: 'posts', key: 'id' }
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        }
    }, { sequelize, modelName: 'like' });

    return Like;
};
