// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

// On connection
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in Database connection: ' + err);
    }
    console.log('Connected to database mongodb @ 27017');
});

// Port number
const port = 3000;

// Adding middleware - cors
app.use(cors());

// Body - parser
app.use(bodyparser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', route);

// Testing server
app.get('/', (req, res) => {
    res.send('foobar');
});

// Binding server with the port
app.listen(port, () => {
    console.log('Server started at port: ' + port);
});