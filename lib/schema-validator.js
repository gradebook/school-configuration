import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import ajv_ from 'ajv';
import isColor from './validators/color.js';
import isUrl from './validators/url.js';
import isDomain from './validators/domain.js';

const AJV = ajv_.default;

const dirname = path.dirname(fileURLToPath(import.meta.url));

const v0p1Schema = JSON.parse(readFileSync(path.resolve(dirname, './parsers/0.1.json')));

export const ajv = new AJV();
ajv.addFormat('color', {
	type: 'string',
	validate: isColor,
});

ajv.addFormat('url', {
	type: 'string',
	validate: isUrl,
});

ajv.addFormat('domain', {
	type: 'string',
	validate: isDomain,
});

ajv.addSchema(v0p1Schema);

function _throwAJVValidationError(message_ = '') {
	const paths = new Set();
	let message = message_ + ':';

	for (const error of ajv.errors) {
		const tree = error.dataPath ?? error.instancePath;
		if (!paths.has(tree)) {
			message += `\n\t${tree} ${error.message}`;
			paths.add(tree);
		}
	}

	throw new Error(message);
}

export default function validate(version, data, context) {
	const isValid = ajv.validate(`v${version}`, data);

	if (!isValid) {
		_throwAJVValidationError(`${context} is invalid`);
	}
}
