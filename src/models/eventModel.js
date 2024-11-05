module.exports = (sequelize) => {
    class Event extends Model {}
    Event.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        visibility: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chapterId: {
            type: DataTypes.INTEGER,
            references: { model: 'chapters', key: 'id' }
        }
    }, { sequelize, modelName: 'event' });

    return Event;
};
