// @ts-check

import {readdir} from 'fs/promises';
import {fileURLToPath} from 'url';
import path from 'path';
import Queue from './queue.js';
import parse from './parsers/0.1.js';
import PrettyError from './pretty-error.js';

// @ts-expect-error
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIGURATIONS_DIRECTORY = path.resolve(__dirname, '../', 'schools');

/** @type {Map<String, Object>} */
const schools = new Map();
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
	schools.set(key, payload);
}

/**
 * @function compileSchool
 * @returns {Promise<object>}
 */
export default function compileSchools() {
	let fileList;

	return new Promise((resolve, reject) => {
		queue.events.on('idle', () => {
			const {length: numberProcessed} = fileList;
			const schoolWord = numberProcessed === 1 ? 'school' : 'schools';
			const message = `Finished processing ${numberProcessed} ${schoolWord}`;

			if (queue.numErrors > 0) {
				queue.dumpErrors();
				console.log(message);
				return reject(new PrettyError(`Build Failed - ${queue.numErrors} ${schoolWord} could not be processed`));
			}

			console.log(message);
			resolve(schools);
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
}
