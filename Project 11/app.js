app.get('/', (req, res) => {
	// view file name + variables
	res.render('index', {
		title: 'View Testing',
		message: 'Hello World'
	});
});

app.set('view engine', 'pug');
app.set('views', './views');
