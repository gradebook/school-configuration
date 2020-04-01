// @ts-check

const {readdir} = require('fs').promises;
const {resolve} = require('path');
const Queue = require('./queue');
const parse = require('./parsers/0.1');
const PrettyError = require('./pretty-error');

const CONFIGURATIONS_DIRECTORY = resolve(__dirname, '../', 'schools');

const schools = {};
const queue = new Queue(processSchoolFile);

/**
 * @function processSchoolFile
 * @description process a school and add the metadata to a JSON BLOB
 * @param {string} filePath - path of file to process
 * @returns {Promise<void>}
 */
async function processSchoolFile(filePath) {
	// Convert `/full/path/to/school.yaml` to `school`
	const key = filePath.split('.yml').shift().split('/').pop().toLowerCase();
	const payload = await parse(`schools/${filePath}`, key);

	if (key in schools) {
		throw new Error(`Duplicate school for ${key}`);
	}

	delete payload.version;
	schools[key] = payload;
}

/**
 * @function compileSchool
 * @returns {Promise<object>}
 */
module.exports = () => {
	let fileList;

	return new Promise((resolve, reject) => {
		queue.events.on('idle', () => {
			const {length: numProcessed} = fileList;
			const schoolWord = numProcessed === 1 ? 'school' : 'schools';
			const message = `Finished processing ${numProcessed} ${schoolWord}`;

			if (queue.numErrors > 0) {
				queue.dumpErrors();
				console.log(message);
				return reject(new PrettyError(`Build Failed - ${queue.numErrors} ${schoolWord} could not be processed`));
			}

			console.log(message);
			resolve(JSON.stringify(schools));
		});

		readdir(CONFIGURATIONS_DIRECTORY)
			.then(files => files.filter(file => /\.yml$/.test(file)))
			.then(files => {
				fileList = files;
				queue.addAll(files);

				if (files.length === 0) {
					console.log('Processed 0 schools');
				}
			});
	});
};
