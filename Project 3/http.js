const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('hello world');
		res.end();
	}

	if (req.url === '/api') {
		res.write(
			JSON.stringify({
				'1': 2
			})
		);
		res.end();
	}
});
// port 3003
server.listen(3003);

console.log('Listening on port 3003...');
