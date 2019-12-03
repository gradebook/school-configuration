// @ts-check
const isBetween = require('./between');

/**
 * @function isColor
 * @description determines if a string is a valid color
 * @param {string} possibleColor
 * @returns {boolean}
 */
module.exports = possibleColor => {
	let [type, data] = possibleColor.split(':');

	if (type === 'rgb') {
		const [r, g, b] = data.split(',');
		return isBetween(Number(r), 0, 255) &&
			isBetween(Number(g), 0, 255) &&
			isBetween(Number(b), 0, 255);
	}

	if (type === 'hsl') {
		const [h, s, l] = data.split(',');
		return isBetween(Number(h), 0, 359) &&
			isBetween(Number(s), 0, 100) &&
			isBetween(Number(l), 0, 100);
	}

	if (type === 'hex') {
		data = data.replace(/^#/, '');
		return (data.length === 3 || data.length === 6) && /^[0-9A-F]+$/i.test(data);
	}

	return false;
};
