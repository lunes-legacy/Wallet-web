// import { estimateBTC, estimateETH } from './families';
import { coins } from 'lunes-lib';
import { errorPattern } from 'Utils/functions';

export default class EstimateFee {
	static staticNetworkFees;
	constructor(){
		this.families = {
			BTC: 'BTCFamily',
			ETH: 'ETHFamily'
		}
	}
	getNetworkFees = () => {
		return this.staticNetworkFees;
	}
	setNetworkFees = (value) => {
		this.staticNetworkFees = value;
	}
	networkFees = async ({network, testnet = TESTNET}) => {
		try {
			if (!testnet)
				testnet = true;
			if (!network)
				throw errorPattern("Network parameter is pending",500,"FEE_NETWORKFEES_ERROR");
			if (this.getNetworkFees() !== undefined) {
				return this.getNetworkFees();
			}
			this.networkFees = await coins.services.networkFees({ network, testnet:true });
			return this.networkFees;
			// return  {
			// 	network: 'LNS',
			// 	data: {
			// 		high: 30,
			// 		medium: 20,
			// 		low: 10
			// 	}
			// }
		} catch (err) {
			throw errorPattern(`An error ocurred on trying to get ${network}'s network fees`, 500, "FEE_NETWORKFEES_ERROR", err);
		}
	}
	go = async (data) => {
		console.warn("DATA::",data);
		if (!data.testnet)
			data.testnet = true;
		if (!data.network)
			throw errorPattern("Network parameter is pending",500,"FEE_CALCULATEFEE_ERROR");

		await this.networkFees({...data});
		this.data        = data;
		this.data.networkFees = this.networkFees.data;
		this.network     = data.network.toUpperCase();
		console.warn("COINS:::",coins);
		return await this._estimate(data);
	}
	_estimate = async (data) => {
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
			// result[level]   = await coins.services.estimateFee({...currentEstimate}, data.accessToken);
		}
		result = {
			high: {
				network: data.network,
				data: {
					fee: 0.001 * 100000000
				}
			},
			medium: {
				network: data.network,
				data: {
					fee: 0.001 * 100000000
				}	
			},
			low: {
				network: data.network,
				data: {
					fee: 0.001 * 100000000
				}		
			}
		}
		return result;
	}
}
