const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');

const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const app = express();

const port = process.env.PORT || 3000;

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));

// environment
const env = app.get('env');
if (env === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Morgan Loaded in Development Stage');
}

// database work ...
dbDebugger('database debugger');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', home);
app.use('/api/genres', genres);

app.listen(port);
