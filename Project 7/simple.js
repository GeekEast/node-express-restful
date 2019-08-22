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
	// validation - simple version
	if (!req.body.name || req.body.name.length < 3) {
		res.status(400).send('Name is required and should be minimum 3 characters.');
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.get('/:id', (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send("The course doesn't exist.");
	res.send(course);
});

app.use(express.json());
app.use('/courses', router);
app.listen(port);
