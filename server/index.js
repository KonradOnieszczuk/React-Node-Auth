// Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:auth/auth');

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening on: ', port);
