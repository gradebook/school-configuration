/**
 * @function isUrl
 * @description determines if {candidate} is a url
 * @param {any} candidate
 * @returns {boolean}
 */
module.exports = candidate => {
	const {hostname} = new URL(candidate);
	return Boolean(hostname);
};
