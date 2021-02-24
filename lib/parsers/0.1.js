// @ts-check
import {readFile} from 'fs/promises';
import path from 'path';
import {load} from 'js-yaml';
import validateSchema from '../schema-validator.js';
import validateColor from '../validators/color.js';
import validateString from '../validators/string.js';
import validateBoolean from '../validators/boolean.js';
import validateUrl from '../validators/url.js';

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
 * @property {string} slug
 */

/**
 * @function parseFile
 * @param {string} filePath - File to parse, uses cwd as base
 * @param {string} name - Name of file to use in error messages
 * @returns {Promise<v01Theme>} - Parsed file
 */
const validate0p1 = async (filePath, name) => {
	/** @type {object} */
	const fileContents = load(
		await readFile(path.resolve(filePath), 'utf8')
	);

	validateSchema(fileContents, THEME_PROPERTIES, name);
	fileContents.slug = name;

	return fileContents;
};

export default validate0p1;
