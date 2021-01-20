/**
 * @function isUrl
 * @description determines if {candidate} is a url
 * @param {any} candidate
 * @returns {boolean}
 */
const isUrl = candidate => {
	const {hostname} = new URL(candidate);
	return Boolean(hostname);
};

export default isUrl;
