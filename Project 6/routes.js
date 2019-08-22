// Import express and initialize an app
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set routes
app.get('/', (req, res) => {
	res.send('Hello World');
});

// start listen
app.listen(port);
