const config = require('config');

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));

// environment
const env = app.get('env');
if (env === 'development') {
	app.use(morgan('tiny'));
	console.log('Morgan Loaded in Development Stage');
}
