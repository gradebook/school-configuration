// @ts-check
const {readFile} = require('fs').promises;
const path = require('path');
const {safeLoad} = require('js-yaml');
const validateSchema = require('../schema-validator');
const validateColor = require('../validators/color');
const validateString = require('../validators/string');
const validateBoolean = require('../validators/boolean');
const validateUrl = require('../validators/url');

/** @type {import('../types/validation-array').ValidationArray} */
const isColor = ['color', validateColor];
/** @type {import('../types/validation-array').ValidationArray} */
const isString = ['string', validateString];
/** @type {import('../types/validation-array').ValidationArray} */
const isBoolean = ['boolean', validateBoolean];
/** @type {import('../types/validation-array').ValidationArray} */
const isUrl = ['url', validateUrl];
/** @type {import('../types/validation-array').ValidationArray} */
const validVersion = ['valid version', thing => thing === '0.1' || thing === 0.1];

/** @type { import('../types/validation-array').ValidationSchema} */
const THEME_PROPERTIES = {
	version: validVersion,
	alias: [...isString, true],
	gpa: [...isBoolean, true],
	theme: {
		primary: isColor,
		hover: isColor,
		background: [...isUrl, true]
	},
	name: [...isString, true]
};

/**
 * @typedef v01Theme
 * @property {'0.1' | 0.1} version
 * @property {string} primary
 * @property {string} hover
 * @property {string} alias
 * @property {string} name
 */

/**
 * @function parseFile
 * @param {string} filePath - File to parse, uses cwd as base
 * @param {string} name - Name of file to use in error messages
 * @returns {Promise<v01Theme>} - Parsed file
 */
module.exports = async (filePath, name) => {
	/** @type {object} */
	const fileContents = safeLoad(
		await readFile(path.resolve(filePath), 'utf8')
	);

	validateSchema(fileContents, THEME_PROPERTIES, name);

	return fileContents;
};
