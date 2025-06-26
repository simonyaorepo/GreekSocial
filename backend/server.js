const dotenv = require('dotenv');
const { connectDB } = require('../src/config/db');
const { syncModels } = require('../src/utils/syncModels');
const app = require('./app');  // Import your configured Express app

dotenv.config();

(async () => {
  await connectDB();
  await syncModels(); // Sync models before the server starts

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
