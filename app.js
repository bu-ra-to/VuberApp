const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.json());
// mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    'mongodb://localhost/vuber',
    { useNewUrlParser: true }
  );
}

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ Error: err.message });
});

module.exports = app;
