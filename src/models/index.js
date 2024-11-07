const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Object to hold models
const models = {};

// Read all model files dynamically, excluding 'index.js'
const modelFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js' && file.endsWith('Model.js'));

modelFiles.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, DataTypes);
  models[model.name] = model;
});

// Set up associations for each model (if they exist)
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  models
};
