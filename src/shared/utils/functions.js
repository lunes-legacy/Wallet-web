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
export {
	errorPattern,
	timestampDiff
}