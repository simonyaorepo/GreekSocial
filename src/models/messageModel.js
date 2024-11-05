module.exports = (sequelize) => {
    class Message extends Model {}
    Message.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        senderId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        },
        receiverId: {
            type: DataTypes.INTEGER,
            references: { model: 'members', key: 'id' }
        }
    }, { sequelize, modelName: 'message' });

    return Message;
};
