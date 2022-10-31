var config = require('../src/config/config.json');

var http = require('http');
var express = require('express');
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
const morgan = require('morgan');

var app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    if (err.name === 'StatusError') {
        res.send(err.status, err.message);
    } else {
        next(err);
    }
});

if (process.env.NODE_ENV === 'development') {
    // using morgan to log HTTP requests
    app.use(morgan('dev'));
    app.use(errorhandler())
}

// set api prefix 
app.use(
    config.apiVersionPrefix, 
    require('../src/port/routes')
);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function(err) {
    console.log('listening in 0.0.0.0:' + port);
});