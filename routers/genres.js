const express = require('express');
const Joi = require('joi');
const router = express.Router();

// data part
const genres = [ { id: 1, name: 'Comedy' }, { id: 2, name: 'Fantasy' }, { id: 3, name: 'Horror' } ];

// middleware function
router.use((req, res, next) => {
	// sth you want to do.
	next();
});

// list all genres
router.get('/', (req, res) => {
	res.send(genres);
});

// GET request
router.get('/:id', (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre) {
		res.status(404).send("genre doesn't exist.");
		return;
	}
	res.send(genre);
});

// POST request
router.post('/', (req, res) => {
	// validation
	const schema = {
		name: Joi.string().required()
	};
	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	// update the data
	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);
	res.send(genre);
});

// PUT request
router.put('/:id', (req, res) => {
	// find the genre
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre) {
		res.status(404).send('Genre not found.');
		return;
	}

	// validation
	const schema = {
		name: Joi.string().required()
	};

	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	// modify the data
	genre.name = req.body.name;
	res.send(genre);
});

// DELETE request
router.delete('/:id', (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));

	if (!genre) {
		res.status(404).send('genre not found.');
	}

	genres.splice(genres.indexOf(genre), 1);
	res.send(genre);
});

module.exports = router;
