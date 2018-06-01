import { estimateBTC, estimateETH } from './families';
import { coins } from 'lunes-lib';
import { errorPattern } from 'Utils/functions';

export default class EstimateFee {
	constructor(){
		this.families = {
			BTC: 'BTCFamily',
			ETH: 'ETHFamily'
		}
	}
	networkFees = async ({network, testnet = TESTNET}) => {
		try {
			if (!testnet)
				testnet = true;
			if (!network)
				throw errorPattern("Network parameter is pending",500,"FEE_NETWORKFEES_ERROR");
			this.networkFees = await coins.services.networkFees({ network, testnet:true });
			return this.networkFees;
			// return  {
			// 	network: 'BTC',
			// 	data: {
			// 		high: 30,
			// 		medium: 20,
			// 		low: 10
			// 	}
			// }
		} catch (err) {
			throw errorPattern(`An error ocurred on trying to get ${network}'s networkFees`, 500, "FEE_NETWORKFEES_ERROR", err);
		}
	}
	estimate = async (data) => {
		if (!data.testnet)
			data.testnet = true;
		if (!data.network)
			throw errorPattern("Network parameter is pending",500,"FEE_CALCULATEFEE_ERROR");

		await this.networkFees({...data});
		this.data        = data;
		this.data.networkFees = this.networkFees.data;
		this.network     = data.network.toUpperCase();

		return await this._switchFamily();
	}
	_switchFamily = () => {
		switch (this.families[this.network]) {
			case 'BTCFamily':
				return this._BTC(this.data);
			case 'ETHFamily':
				return this._ETH(this.data);
			default:
				throw errorPattern("Network parameter is pending",500,"FEE_CALCULATEFEE_ERROR"); break;
		}
	}
	_BTC = async (data) => {
		return await estimateBTC(data);
	}
	_ETH = async (data) => {
		return await estimateETH(data);
	}
}
