const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const jwt = require('jsonwebtoken');
const app = express();


app.set('secretKey', 'expresApi');

mongoose.connection.on('error', console.error.bind(console, 'Database connection error'));


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ tutorial: 'Rest API with express' });
});

// public route
app.use('/users', users);

app.use('/movies', validateUser, movies);

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            if (err) {
                next(err);
            } else {
                req.body.userId = decoded.id;
                next();
            }
        });
}

app.use((req, res, next) => {
    let err = new Error('Not Found!');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).json({ message: 'Not Found!' });
    } else {
        res.status(500).json({ message: 'Something looks wrong!' });
    }
});

app.listen(3000, () => {
    console.log('server listening on 3000')
});