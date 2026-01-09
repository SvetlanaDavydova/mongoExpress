const express = require('express');
const router = require("./userRouter.js")

const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.use('/api/users', router);

module.exports = app;