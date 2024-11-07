const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,  // Disable SQL query logging
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if unable to connect
  }
};

module.exports = { sequelize, connectDB };