// @ts-check
/**
 * @param {object} unsafeObject
 * @param {import('./types/validation-array').ValidationSchema} schema
 * @param {string} name
 * @param {string} parent
 */
module.exports = function validateSchema(unsafeObject, schema, name, parent = null) {
	const allKeys = Object.keys(schema);
	for (const [key, value] of Object.entries(unsafeObject)) {
		const tree = parent ? `${parent}.${name}` : name;
		const keySchema = schema[key];

		if (value === null) {
			throw new Error(`Failed parsing ${name} - "${tree}" is null`);
		}

		const index = allKeys.indexOf(key);
		if (index === -1) {
			throw new Error(`Failed parsing ${name} - Unknown property "${key}"`);
		}

		allKeys[index] = null;

		// CASE: recursion
		if (!Array.isArray(keySchema)) {
			validateSchema(value, keySchema, name, tree);
			continue;
		}

		const [type, validate] = keySchema;
		if (!validate(value)) {
			throw new Error(`Failed parsing ${name} - "${key}" is not a ${type}`);
		}
	}

	const missingKeys = allKeys.filter(Boolean);

	for (const key of missingKeys) {
		if (schema[key][2] !== true) {
			throw new Error(`Failed parsing ${name} - "${key}" is a missing but required property`);
		}
	}
};
