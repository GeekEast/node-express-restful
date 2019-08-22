// http post request examples
var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

const courses = [ { id: 1, name: 'Statistics' }, { id: 2, name: 'Data Mining' }, { id: 3, name: 'Public Policy' } ];

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	res.send(courses);
});

router.post('/', (req, res) => {
	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.get('/:id', (req, res) => {
	// array find
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	// 404 response.
	if (!course) res.status(404).send("The course doesn't exist.");

	// normal response
	res.send(course);
});

// use the json middleware.
app.use(express.json());
app.use('/courses', router);
app.listen(port);
