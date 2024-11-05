module.exports = (sequelize) => {
    class Member extends Model {}
    Member.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chapterId: {
            type: DataTypes.INTEGER,
            references: { model: 'chapters', key: 'id' }
        }
    }, { sequelize, modelName: 'member' });

    return Member;
};
