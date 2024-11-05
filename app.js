const express = require('express');
const app = express();
const routes = require('./routes'); // Adjust path as necessary

app.use(express.json());
app.use('/api', routes); // Prefix all routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});