const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Organization extends Model {}
    Organization.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT
    }, { sequelize, modelName: 'organization' });

    return Organization;
};