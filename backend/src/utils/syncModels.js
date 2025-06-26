// src/utils/syncModels.js
const { sequelize } = require('../models'); // this pulls sequelize and models
const models = require('../models');

const syncModels = async () => {
  try {
    await sequelize.sync({ /*force: true*/alter: true }); // or force: true for development
    console.log('✅ Models synced!');
  } catch (err) {
    console.error('❌ Failed to sync models:', err);
    process.exit(1);
  }
};

// WARNING: Do not use { alter: true } or { force: true } in production! Use migrations for schema changes.
// See: https://sequelize.org/master/manual/migrations.html

// Allow running directly: node src/utils/syncModels.js
if (require.main === module) {
  (async () => {
    await syncModels();
    process.exit(0);
  })();
}

module.exports = { syncModels };
