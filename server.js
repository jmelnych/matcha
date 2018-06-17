const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

/* import controllers here */
const UserController = require('./controllers/UserController');
app.use('/user', UserController);


const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
module.exports = app;