const env = app.get('env');
if (env === 'development') {
	app.use(morgan('tiny'));
	console.log('Morgan Loaded in Development Stage');
}


const config = require('config');
// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
// if not define in custom, will read from other json files
// if defined in custom, will not read from other json files
console.log('Mail Server Name: ' + config.get('mail.key'));


// read environment variable

