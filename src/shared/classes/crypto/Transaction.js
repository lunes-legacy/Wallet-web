import { TESTNET } from 'Config/constants';
import { errorPattern } from 'Utils/functions';

class TransactionClass {
	constructor(){
		this.amount = 10.00000000;
		this.fee    = 0.00001;
		this.toAddress = '09a0b9a09f09c9d0e909b0a9c077a';
	}
}
class Fee {
	constructor(){
		// this.validNetworks = ['BTC','ETH'];
		// this.networks = {
		// 	defaultFees: {
		// 		BTC: 0.000001,
		// 		ETH: 0.000001
		// 	}
		// };
		// this.defaultEstimateParams = {
		// 	network,
		// 	testnet,
		// 	toAddress,
		// 	fromAddress,
		// 	amount
		// }
	// }
	// _setEstimateParam = (data) => {
	// 	let { network } = data;
	// 	let levels = { high:'', medium:'', low:'' };
	// 	for (let currentLevel in levels) {
			
	// 	}
	// 	switch (network) {
	// 		case 'BTC': 
	// 			this.estimateParam = {
	// 				...data,
	// 			}; break;
	// 		case 'ETH':
	// 			this.estimateParam = {
	// 				...data
	// 			}; break;
	// 		default:
	// 			throw errorPattern("Network should be a valid network", 500, "FEE_ESTIMATEPARAM_ERROR");
	// 	}
	// }
	networkFees = ({network, testnet = TESTNET}) => {
		if (!data.testnet)
			data.testnet = true;
		if (!network)
			throw errorPattern("Param network is pending",500,"FEE_NETWORKFEES_ERROR");

		this.networkFees = coins.services.networkFees({network, testnet});
		return this.networkFees;
	}
	calculateFee = async (data) => {
		if (!data.testnet)
			data.testnet = true;
		if (!data.network)
			throw errorPattern("Param network is pending",500,"FEE_CALCULATEFEE_ERROR");

		this.networkFees({...data});
		return new Estimate(data).go();
	}
	estimate = () => {
		
	}
}
class Estimate {
	go = ({ data, networkFees, defaultParams }) => {
		switch (network) {
			case 'BTC':
				this.BTC({ data, networkFees, defaultParams });
			case 'ETH':
				this.ETH({ data, networkFees, defaultParams });
			default:
				throw errorPattern("Param network is pending",500,"FEE_CALCULATEFEE_ERROR"); break;
		}
	}
	BTC = (data) => {
		return new EstimateBTC().estimate(data); break;
	}
	ETH = (data) => {
		return new EstimateETH().estimate(data); break;
	}
}
class EstimateBTC {
	constructor(){}
	estimate = (data) => {
		// this.data          = data;
		// this.networkFees   = networkFees;
		// this.defaultParams = defaultParams;
		let params = {
			high:   {}
			medium: {}
			low:    {}
		};
		data = this.data;
		for (let level in this.params) {
			this.params[level] = {
				...data,
				feePeerByte: this.networkFees[level]
			}
		}
		return await coins.services.estimateFee(this.params);
	}
}
class EstimateETH {
	constructor(){
	}
	estimate = ({ data, networkFees, defaultParams }) => {
		data = this.data;
		for (let level in this.params) {
			this.params[level] = {
				...data,
				feePeerByte: this.networkFees[level]
			}
		}
		let r = await coins.services.estimateFee(this.params);
		return r;
	}
}

export default TransactionClass;
