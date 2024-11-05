module.exports = (sequelize) => {
    class Chapter extends Model {}
    Chapter.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationId: {
            type: DataTypes.INTEGER,
            references: { model: 'organizations', key: 'id' }
        }
    }, { sequelize, modelName: 'chapter' });

    return Chapter;
};
