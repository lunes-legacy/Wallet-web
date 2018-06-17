import { coins } from 'lunes-lib';

export const estimateBTC = async (data) => {
	let params = {
		high:   {},
		medium: {},
		low:    {}
	};
	let result = {
		high:   {},
		medium: {},
		low:    {}	
	}
	let { networkFees } = data;
	let currentEstimate;
	data.amount = coins.util.unitConverter.toSatoshi(data.amount);
	for (let level in params) {
		params[level] = {
			...data,
			feePeerByte: networkFees[level]
		}
		currentEstimate = params[level];
		result[level] = await coins.services.estimateFee({...currentEstimate}, data.accessToken);
		// result[level] = 'boi';
	}
	return result;
	// return {
	// 	network: 'BTC',
	// 	data: {
	// 		fee: 100
	// 	}
	// }
}
