// @ts-check
const {readFile} = require('fs').promises;
const {resolve} = require('path');
const {safeLoad} = require('js-yaml');
const validateColor = require('../validators/color');
const validateString = require('../validators/string');
const validateUrl = require('../validators/url');

const isColor = ['color', validateColor];
const isString = ['string', validateString];
const isUrl = ['url', validateUrl];
const validVersion = ['valid version', thing => thing === '0.1' || thing === 0.1];

// [name, validate, isOptional]
const THEME_PROPERTIES = {
	version: validVersion,
	alias: [...isString, true],
	primary: isColor,
	hover: isColor,
	name: [...isString, true],
	background: [...isUrl, true]
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
	const fileContents = safeLoad(
		await readFile(resolve(filePath), 'utf8')
	);

	const requiredKeys = Object.keys(THEME_PROPERTIES);

	// eslint-disable-next-line guard-for-in
	for (const key in fileContents) {
		const value = fileContents[key];

		if (value === null) {
			throw new Error(`Failed parsing ${name} - "${key}" is null`);
		}

		const index = requiredKeys.indexOf(key);
		if (index === -1) {
			throw new Error(`Failed parsing ${name} - Unknown property "${key}"`);
		}

		requiredKeys[index] = null;

		const [type, validate] = THEME_PROPERTIES[key];
		if (!validate(fileContents[key])) {
			throw new Error(`Failed parsing ${name} - "${key}" is not a ${type}`);
		}
	}

	const missingKeys = requiredKeys.filter(Boolean);

	for (const key of missingKeys) {
		if (THEME_PROPERTIES[key][2] !== true) {
			throw new Error(`Failed parsing ${name} - "${key}" is a missing but required property`);
		}
	}

	return fileContents;
};
