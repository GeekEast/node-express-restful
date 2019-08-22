const mongoose = require('mongoose');
// host: localhost
// 27017: port
// database: playground
// return: a promise object.
mongoose
	.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true }) // MongoDB will create the playground automatically
	.then(() => console.log('Connecting to the MongoDB...'))
	.catch((err) => console.log(err));
