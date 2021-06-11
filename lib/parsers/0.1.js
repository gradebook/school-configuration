// @ts-check
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {load} from 'js-yaml';
import validateSchema from '../schema-validator.js';

/**
 * @function parseFile
 * @param {string} filePath - File to parse, uses cwd as base
 * @param {string} name - Name of file to use in error messages
 * @returns {Promise<Record<string, unknown>>} - Parsed file
 */
const validate0p1 = async (filePath, name) => {
	/** @type {object} */
	const fileContents = load(
		await readFile(path.resolve(filePath), 'utf8')
	);

	validateSchema('0.1', fileContents, name);
	fileContents.slug = name;

	return fileContents;
};

export default validate0p1;
