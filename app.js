const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const isAuth = require('./middleware/auth');

const DBurl='mongodb://localhost:27017/eynos'
const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const balancedRoutes = require("./routes/balanced");
const userRoutes = require("./routes/users");

app.use("/api/user", userRoutes);
app.use("/api", balancedRoutes);

// TODO: mongoose connection
mongoose
  .connect(DBurl)
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
