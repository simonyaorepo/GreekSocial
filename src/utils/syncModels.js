// src/utils/syncModels.js
const { sequelize } = require('../models'); // this pulls sequelize and models
const models = require('../models');

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // or force: true for development
    console.log('✅ Models synced!');
  } catch (err) {
    console.error('❌ Failed to sync models:', err);
    process.exit(1);
  }
};

// Allow running directly: node src/utils/syncModels.js
if (require.main === module) {
  (async () => {
    await syncModels();
    process.exit(0);
  })();
}

module.exports = { syncModels };
