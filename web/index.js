const express = require('express');
const sensors = require('./sensors');
const cors = require('cors');
const port = process.env.PORT || 80;
const app = express();

app.get('/sensors', cors(), sensors);

app.listen(port);
