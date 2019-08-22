var express = require('express');
// import joi
const Joi = require('joi');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

var courses = [ { id: 1, name: 'Statistics' }, { id: 2, name: 'Data Mining' }, { id: 3, name: 'Public Policy' } ];

router.use((req, res, next) => {
	next();
});

// put method
router.put('/:id', (req, res) => {
	// look up the course
	let course = courses.find((c) => c.id === parseInt(req.params.id));

	// if no such course
	if (!course) {
		res.status(400).send('no such course.');
		return;
	}

	// if exist, validate
	const schema = {
		name: Joi.string().min(3).required()
	};
	const result = Joi.validate(req.body, schema);

	// validation fails
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	// change data in place
	course.name = req.body.name;
	res.send(course);
});

router.get('/', (req, res) => {
	res.send(courses);
});

router.post('/', (req, res) => {
	const schema = {
		name: Joi.string().min(3).required()
	};
	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
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

router.delete('/:id', (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("Course doesn't exsit.");
		return;
	}

	// this happens in place
	courses.splice(courses.indexOf(course), 1);
	res.send(course);
});

app.use(express.json());
app.use('/courses', router);
app.listen(port);
