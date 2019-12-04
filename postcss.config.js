const purgecss = require('@fullhuman/postcss-purgecss')({
	// Specify the paths to all of the template files in your project
	content: [
		'site/*.html'
	],

	// Include any special characters you're using in this regular expression
	defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		process.env.npm_config_argv.includes('css:dev') ? null : purgecss,
		require('cssnano')
	]
};
