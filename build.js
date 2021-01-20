#! /usr/bin/env node

const {writeFile, mkdir} = require('fs').promises;
const {copy} = require('fs-extra');
const compileSchools = require('./lib/compile-schools');
const maskableIcon = require('./lib/icons/icon-maskable');
const icon = require('./lib/icons/icon');

async function run() {
	await mkdir('./dist/api/v0', {recursive: true});
	const schoolList = await compileSchools();
	const globalConfig = {};

	const writeQueue = [];

	for (const [name, contents] of schoolList) {
		globalConfig[name] = contents;
		const singleFile = {
			[name]: contents
		};
		writeQueue.push(writeFile(`./dist/api/v0/${name}.json`, JSON.stringify(singleFile)));
		writeQueue.push(writeFile(`./dist/api/v0/icon-${name}-maskable.svg`, maskableIcon(contents.theme.primary)));
	}

	writeQueue.push(writeFile('./dist/api/v0/global.json', JSON.stringify(globalConfig)));
	writeQueue.push(writeFile('./dist/api/v0/icon.svg', icon));

	writeQueue.push(
		copy('./site', './dist')
	);

	return Promise.all(writeQueue);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	process.exit(1);
});
