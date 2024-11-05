module.exports = (sequelize) => {
    class Notification extends Model {}
    Notification.init({
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { sequelize, modelName: 'notification' });

    return Notification;
};
