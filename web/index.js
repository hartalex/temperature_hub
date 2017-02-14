var express = require('express');
const port = process.env.PORT || 80;
const app = express();

app.use(express.static(__dirname + '/static/'));

app.listen(port);
