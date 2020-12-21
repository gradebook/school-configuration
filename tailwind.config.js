// @ts-check
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	purge: {
		enabled: isProduction,
		mode: 'all',
		content: ['site/**/*.html']
	},
	theme: {},
	variants: {},
	plugins: []
};
