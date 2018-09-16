const Speech = require('../models/speech.model');


/* Recreated async Function*/
async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}


/*
* Filter stub for Unique
* */
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

/**
 * return all flash adverts
 */
exports.index = (req, res) => {
	Speech.find({}, (err, flashes) => {
		return err ? console.error(err) : res.send(flashes);
	});
};


/*
* Create a new type of speech
*
* */
exports.create = (req, res) => {
	Speech.create(req.body)
			.then(speech => res.send({error: false, data: speech}))
			.catch(err => res.status(400).send({error: true, message: err.message || err}));
};


/*
* Analyze a given paragraph
*
* */
exports.analyze = async (req, res) => {
	const paragraph = req.body.paragraph;

	// Throw Error if no paragraph
	if (typeof paragraph === "undefined" || paragraph === null) {
		return res.status(400).send({error: true, message: 'A paragraph field is required!'})
	}

	// put words in array & filter out duplicates
	let tags = paragraph.split(' ').filter(onlyUnique);

	let solution = {};

	/*tags.forEach(tag => {
		Speech.findOne({$text: {$search: tag}}).exec()
				.then(speech => {
					if (speech) {
						console.log(tag, ' >>> ', speech.name);
						solution[speech.name] = [].push(tag);
					}
				}).catch()
	});*/

	await asyncForEach(tags, async (tag) => {
		await Speech
				.findOne({$text: {$search: tag}})
				.exec()
				.then(speech => {
					if (speech) {
						// console.log(tag, ' >>> ', speech.name);

						// Create array if it doesn't exist...
						if (typeof solution[speech.name] === 'undefined') {
							solution[speech.name] = [];
						}

						// Add word to appropriate speech category
						solution[speech.name].push(tag);
					}
				});
	});

	return res.send({error: false, data: solution});
};



