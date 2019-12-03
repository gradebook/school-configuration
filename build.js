const compileThemes = require('./lib/compile-themes');
const {writeFile} = require('fs').promises;

async function run() {
	const themeConfig = await compileThemes();
	await writeFile('.ci-theme-data.json', themeConfig);
}

run().catch(error => {
	console.log(error.excludeStack ? error.toString() : error);
	process.exit(1);
});
