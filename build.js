const {writeFile} = require('fs').promises;
const compileThemes = require('./lib/compile-themes');

async function run() {
	const themeConfig = await compileThemes();
	await writeFile('.ci-theme-data.json', themeConfig);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
