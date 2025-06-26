const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('../src/routes');
const errorHandler = require('../src/utils/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Global error handler middleware
app.use(errorHandler);

module.exports = app;
