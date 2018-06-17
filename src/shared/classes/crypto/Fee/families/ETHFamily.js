import { coins } from 'lunes-lib';

export const estimateETH = async (data) => {
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
	data.amount = coins.util.unitConverter.toWei(data.amount);
	for (let level in params) {
		params[level] = {
			...data,
			gasLimit: 21000,
			gasPrice: networkFees[level]
		}
		currentEstimate = params[level];
		result[level] = await coins.services.estimateFee({...currentEstimate}, data.accessToken);
	}
	return result;
	// return {
	// 	network: 'ETH',
	// 	data: {
	// 		txFee: 100,
	// 		gasPrice: 30,
	// 		gasLimit: 150
	// 	}
	// }
}
