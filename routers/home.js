const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'View Testing',
		message: 'Hello World'
	});
});

module.exports = router;
