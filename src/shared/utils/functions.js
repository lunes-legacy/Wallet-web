const errorPattern = (message, code, text, log) => {
	return { message, code, text, log };
}
const timestampDiff = ({first = undefined, second = undefined}) => {
	if (!first)
		throw errorPattern(`timestampDiff error on 'first' parameter, got ${first}`,500,'TIMESTAMP_DIFF_ERROR'); 
	let old       = new Date('04/30/2018').getTime();
	let now       = second || Date.now();
	let timeDiff  = Math.abs(now - old);
	let hoursDiff = Math.floor(timeDiff / (1000 * 3600));
	// let daysDiff  = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return hoursDiff;
}
const hexToRgba = (hex, alpha) => {
	let r = parseInt(hex.slice(1,3), 16),
	    g = parseInt(hex.slice(3,5), 16),
	    b = parseInt(hex.slice(5,7), 16);
	if (alpha) {
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	} else {
		return `rgba(${r}, ${g}, ${b})`;
	}
}
export {
	errorPattern,
	timestampDiff,
	hexToRgba
}