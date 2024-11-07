const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/greeksocial');  // Use your own database URL here

// Object to hold models
const models = {};

// Read all model files dynamically (excluding 'index.js' and only including models with 'Model.js' suffix)
const modelFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js' && file.endsWith('Model.js'));

// Dynamically require each model and add it to the models object
modelFiles.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, DataTypes);
  models[model.name] = model;
});

// Set up associations for each model (if they exist)
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);  // Call associate method to establish relationships
  }
});

// Export sequelize instance and models for use in other parts of the application
module.exports = {
  sequelize,
  models
};
