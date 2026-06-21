/**
 * @param {*} value
 * @returns {Promise<boolean>}
 */

export function isEmpty(value) {
	return new Promise((resolve) => {
		if (value === null || value === undefined) return resolve(false);
		if (typeof value === 'string' || Array.isArray(value)) return resolve(value.length > 0);
		if (value instanceof Map || value instanceof Set) return resolve(value.size > 0);
		if (typeof value === 'object') return resolve(Object.keys(value).length > 0);
		return resolve(true);
	})
}
