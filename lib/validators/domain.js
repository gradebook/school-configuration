const ORIGIN_REGEX = /^[a-z\d]+\.[a-z]{3,}$/;
/**
 * @param {any} candidate
 * @returns {boolean}
 */
const isDomain = candidate => typeof candidate === 'string' && ORIGIN_REGEX.test(candidate);

export default isDomain;
