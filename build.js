const {writeFile} = require('fs').promises;
const compileSchools = require('./lib/compile-schools');

async function run() {
	const globalConfig = await compileSchools();
	console.log(globalConfig)
	// await writeFile('.ci-school-data.json', globalConfig);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
