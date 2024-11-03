const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'greekhub_test',
    password: 'Blazefire123!',
    port: 5432,
});

app.use(bodyParser.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to GreekHub API!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});