// import { estimateBTC, estimateETH } from './families';
import { coins } from 'lunes-lib';
import { errorPattern } from 'Utils/functions';
import { TESTNET } from 'Config/constants';
import { decrypt } from 'Utils/crypt';

export default class FeeClass {
	static staticNetworkFees;
	constructor(){
		this.families = {
			BTC: 'BTCFamily',
			ETH: 'ETHFamily'
		}
	}
	getStaticNetworkFees = () => {
		return this.staticNetworkFees;
	}
	setStaticNetworkFees = (value) => {
		this.staticNetworkFees = value;
	}
	/*
	return  {
		network: 'LNS',
		data: {
			high: 30,
			medium: 20,
			low: 10
		}
	}
	*/
	getNetworkFees = async ({network, testnet = TESTNET}) => {
		try {
			if (!network)
				throw errorPattern("Network parameter is pending",500,"FEE_NETWORKFEES_ERROR");
			if (this.getStaticNetworkFees() !== undefined) {
				return this.getStaticNetworkFees();
			}
			return coins.services.networkFees({ network, testnet: TESTNET });
			
		} catch (err) {
			throw errorPattern(`An error ocurred on trying to get ${network}'s network fees`, 500, "FEE_NETWORKFEES_ERROR", err);
		}
	}

	estimate = async (data) => {
		try {
			if (!data.networkFees) {
				data.networkFees = await this.getNetworkFees({...data});
				if (!data.networkFees) {
					throw errorPattern(`We've tried to get ${data.network}'s network fees, but it have resulted in error`, 500, 'FEE_ESTIMATE_ERROR');
				}
				data.networkFees = data.networkFees.data;
			} else {
				data.networkFees = data.networkFees.data;
			}
			if (!data.toAddress || !data.fromAddress) {
				throw errorPattern('You should pass through a valid address', 500, 'FEE_ESTIMATE_ERROR')
			}
			if (!data.accessToken) {
				if (window || document) {
					data.accessToken = JSON.parse(decrypt(localStorage.getItem('ACCESS-TOKEN'))).accessToken;
				} else {
					throw errorPattern('We can\'t estimate the fee, without the user\'s access token', 500,'FEE_ESTIMATE_ERROR');
				}
			}
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
			data.amount = coins.util.unitConverter.toSatoshi(data.amount).toString();
			for (let level in params) {
				if (this.network === "ETH") {
					params[level] = {
						...data,
						gasLimit: 21000,
						gasPrice: networkFees[level]
					}
				} else {
					params[level] = {
						...data,
						feePeerByte: networkFees[level]
					}
				}
				currentEstimate = params[level];
				result[level]   = await coins.services.estimateFee({...currentEstimate}, data.accessToken);
			}
			// result = {
			// 	low: {
			// 		network: data.network,
			// 		data: {
			// 			fee: 0.001 * 100000000
			// 		}		
			// 	},
			// 	medium: {
			// 		network: data.network,
			// 		data: {
			// 			fee: 0.001 * 100000000
			// 		}	
			// 	},
			// 	high: {
			// 		network: data.network,
			// 		data: {
			// 			fee: 0.001 * 100000000
			// 		}
			// 	}
			// }
			return result;
		} catch (err) {
			console.error(err);
			return err;
		}
	}
}
