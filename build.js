#! /usr/bin/env node

import {writeFile, mkdir} from 'node:fs/promises';
import process from 'node:process';
import {copy} from 'fs-extra';
import compileSchools from './lib/compile-schools.js';
import renderMaskableIcon from './lib/templates/icon-maskable.js';
import renderFavicon from './lib/templates/favicon.js';
import renderManifest from './lib/templates/webmanifest.js';

async function run() {
	await mkdir('./dist/api/v1', {recursive: true});
	const schoolList = await compileSchools();
	const globalConfig = {};

	const writeQueue = [];

	for (const [name, contents] of schoolList) {
		globalConfig[name] = contents;
		const singleFile = {
			[name]: contents,
		};

		// eslint-disable-next-line no-await-in-loop
		await mkdir(`./dist/api/v1/${name}`, {recursive: true});
		writeQueue.push(
			writeFile(`./dist/api/v1/${name}/config.json`, JSON.stringify(singleFile)),
			writeFile(`./dist/api/v1/${name}/icon-maskable.svg`, renderMaskableIcon(contents.theme.primary)),
			writeFile(`./dist/api/v1/${name}/favicon.svg`, renderFavicon(contents.theme.primary)),
			writeFile(`./dist/api/v1/${name}/manifest.webmanifest`, renderManifest(name, contents.theme.primary)),
		);
	}

	writeQueue.push(
		writeFile('./dist/api/v1/global.json', JSON.stringify(globalConfig)),
		copy('./site', './dist'), // Copy frontend to dist folder. Note that dist folder already exists
		copy('_headers', './dist/_headers'),
		copy('robots.txt', './dist/robots.txt'),
	);

	return Promise.all(writeQueue);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	process.exit(1);
});
