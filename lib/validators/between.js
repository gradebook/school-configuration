// @ts-check

/**
 * @function isBetween
 * @description determines if a number is inclusively between {floor} and {ceil}
 * @param {Number} candidate
 * @param {Number} floor
 * @param {Number} ceil
 * @returns {boolean}
 */
module.exports = (candidate, floor, ceil) => {
	return !isNaN(candidate) && candidate >= floor && candidate <= ceil;
};
