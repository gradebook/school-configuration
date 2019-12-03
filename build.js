// @ts-check

const {readdir} = require('fs').promises;
const {resolve} = require('path');
const Queue = require('./lib/queue');
const parse = require('./lib/parsers/0.1');

const THEMES_DIRECTORY = resolve(__dirname, 'themes');

let fileList;
const themes = {};
const queue = new Queue(processThemeFile);
queue.events.on('idle', terminate);

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

function terminate() {
	queue.dumpErrors();
	console.log(`Finished processing ${fileList.length} theme${fileList.length === 1 ? '' : 's'}`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(queue.numErrors);
}

async function run() {
	fileList = (await readdir(THEMES_DIRECTORY)).filter(file => /\.yaml$/.test(file));
	queue.addAll(fileList);
}

run().catch(console.log);
