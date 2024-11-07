const { sequelize, connectDB } = require('../config/db'); // Adjust if necessary for db config file
const { models } = require('../models'); // Relative path to models folder

async function syncAllModels() {
  try {
    // Synchronize all models (you can set { force: true } if you want to drop the tables and recreate them)
    await sequelize.sync({ force: false });
    console.log('All models are synchronized with the database.');

    // Optionally log each model sync status
    for (const modelName in models) {
      console.log(`Model ${modelName} synced successfully`);
    }
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

// Run the sync function
syncAllModels();