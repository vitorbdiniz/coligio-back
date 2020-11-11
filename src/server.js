const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./app/routes/index');

const { PORT } = require('./config/environment').API;

require('./db');

app.use('/', routes);

app.use(cors());
app.use(express.json());
app.listen(PORT || 3000);
