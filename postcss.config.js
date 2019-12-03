const purgecss = require('@fullhuman/postcss-purgecss')({
	// Specify the paths to all of the template files in your project
	content: [
		'docs/*.html'
	],

	// Include any special characters you're using in this regular expression
	defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		process.env.npm_lifecycle_script.includes('--watch') ? null : purgecss,
		require('cssnano')
	]
};
