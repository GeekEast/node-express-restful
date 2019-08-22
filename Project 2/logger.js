const url = 'http://www.example.com/login';
log = (m) => {
	console.log(m);
};

// export the log function as log.
module.exports.log = log;

// export single function
module.exports = log;

// Or
moduel.exports = {
	log: log,
	url: url
};
