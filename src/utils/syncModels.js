const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');  // Ensure you're using the correct path to your database config

// Object to hold models
const models = {};

// Read all model files dynamically, excluding 'index.js'
const modelFiles = fs.readdirSync(path.join(__dirname, '../models')).filter(file => file !== 'index.js' && file.endsWith('Model.js'));

modelFiles.forEach(file => {
  // Dynamically import each model file
  console.log('Loading model:', file);
  const model = require(path.join(__dirname, '../models', file));
  models[model.name] = model;
});

// Set up associations for each model (if they exist)
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    console.log(`Associating model: ${modelName}`);
    models[modelName].associate(models);
  }
});

console.log('Models:', models);

// Sync all models to the database
sequelize.sync({ force: true })  // 'force: true' will drop and recreate tables (use with caution in production)
  .then(() => {
    console.log('Models synced to the database!');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

module.exports = models;  // Export models to be used elsewhere