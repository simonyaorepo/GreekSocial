// src/models/index.js
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/db');

const models = {};
const basename = path.basename(__filename);

// Load all main and detail models
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('Model.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    if (model && model.name) {
      models[model.name] = model;
    }
  });

// Explicitly require all join/tag models to ensure they are loaded for associations
['postTagModel', 'commentTagModel', 'eventTagModel', 'accountTagModel', 'accountRoleModel', 'accountPermissionModel'].forEach(file => {
  const model = require(path.join(__dirname, file));
  if (model && model.name) {
    models[model.name] = model;
  }
});

Object.keys(models).forEach(name => {
  if (models[name].associate) {
    models[name].associate(models);
  }
});

module.exports = { ...models, sequelize };
