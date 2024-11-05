const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes'); // Adjust path as necessary
const controllers = require('./controllers');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use('/api', routes); // Prefix all routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
  });