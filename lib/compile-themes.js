// @ts-check

const {readdir} = require('fs').promises;
const {resolve} = require('path');
const Queue = require('./queue');
const parse = require('./parsers/0.1');
const PrettyError = require('./pretty-error');

const THEMES_DIRECTORY = resolve(__dirname, '../', 'themes');

const themes = {};
const queue = new Queue(processThemeFile);

/**
 * @function processThemeFile
 * @description process a theme and add the metadata to a JSON BLOB
 * @param {string} filePath - path of file to process
 * @returns {Promise<void>}
 */
async function processThemeFile(filePath) {
	// Convert `/full/path/to/theme.yaml` to `theme`
	const key = filePath.split('.yaml').shift().split('/').pop().toLowerCase();
	const payload = await parse(`themes/${filePath}`, key);

	if (key in themes) {
		throw new Error(`Duplicate theme for ${key}`);
	}

	delete payload.version;
	themes[key] = payload;
}

/**
 * @function compileTheme
 * @returns {Promise<object>}
 */
module.exports = () => {
	let fileList;

	return new Promise((resolve, reject) => {
		queue.events.on('idle', () => {
			const {length: numProcessed} = fileList;
			const themeWord = numProcessed === 1 ? 'theme' : 'themes';
			const message = `Finished processing ${numProcessed} ${themeWord}`;

			if (queue.numErrors > 0) {
				queue.dumpErrors();
				console.log(message);
				return reject(new PrettyError(`Build Failed - ${queue.numErrors} ${themeWord} could not be processed`));
			}

			console.log(message);
			resolve(JSON.stringify(themes));
		});

		readdir(THEMES_DIRECTORY)
			.then(files => files.filter(file => /\.yaml$/.test(file)))
			.then(files => {
				fileList = files;
				queue.addAll(files);
			});
	});
};
