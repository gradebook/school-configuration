const {writeFile, mkdir} = require('fs').promises;
const {copy} = require('fs-extra');
const compileSchools = require('./lib/compile-schools');

async function run() {
	await mkdir('./dist/api/v0', {recursive: true});
	const schoolList = await compileSchools();
	const globalConfig = {};

	const writeQueue = [];

	for (const [name, contents] of schoolList) {
		globalConfig[name] = contents;
		writeQueue.push(writeFile(`./dist/api/v0/${name}.json`, JSON.stringify(contents)));
	}

	writeQueue.push(writeFile('./dist/api/v0/global.json', JSON.stringify(globalConfig)));

	writeQueue.push(
		copy('./site', './dist')
	);

	return Promise.all(writeQueue);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
