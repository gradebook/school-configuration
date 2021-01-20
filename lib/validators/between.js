// @ts-check

/**
 * @function isBetween
 * @description determines if a number is inclusively between {floor} and {ceil}
 * @param {Number} candidate
 * @param {Number} floor
 * @param {Number} ceil
 * @returns {boolean}
 */
const isBetween = (candidate, floor, ceil) => {
	return !Number.isNaN(candidate) && candidate >= floor && candidate <= ceil;
};

export default isBetween;
