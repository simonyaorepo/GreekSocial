// src/models/index.js
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/db');

const models = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('Model.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(name => {
  if (models[name].associate) {
    models[name].associate(models);
  }
});

module.exports = { ...models, sequelize };
